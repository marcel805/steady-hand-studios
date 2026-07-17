"use server";

import { randomBytes } from "crypto";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NDA_VERSION } from "@/lib/nda-content";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in.");

  const { data: admin } = await supabase
    .from("admin_users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();
  if (!admin) throw new Error("Not an admin.");

  return user;
}

function generatePassword() {
  // Readable-ish but strong: e.g. "f3a9-72c1-9de4"
  return randomBytes(9)
    .toString("hex")
    .match(/.{1,4}/g)!
    .join("-");
}

export async function createNdaRequest(formData: FormData) {
  const adminUser = await requireAdmin();
  const supabase = await createClient();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const trade = String(formData.get("trade") ?? "").trim();

  if (!name || !email) {
    return { error: "Name and email are required." };
  }

  const { data, error } = await supabase
    .from("nda_requests")
    .insert({
      name,
      email,
      phone: phone || null,
      trade: trade || null,
      nda_version: NDA_VERSION,
      created_by: adminUser.id,
    })
    .select("token")
    .single();

  if (error) return { error: error.message };

  return { token: data.token };
}

export async function createContractorFromNda(ndaRequestId: string) {
  await requireAdmin();
  const admin = createAdminClient();

  const { data: ndaRequest, error: fetchError } = await admin
    .from("nda_requests")
    .select("id, name, email, phone, trade, status, contractor_id")
    .eq("id", ndaRequestId)
    .single();

  if (fetchError || !ndaRequest) return { error: "NDA request not found." };
  if (ndaRequest.status !== "signed") {
    return { error: "This NDA hasn't been signed yet." };
  }
  if (ndaRequest.contractor_id) {
    return { error: "A login was already created for this request." };
  }

  const password = generatePassword();

  const { data: created, error: createError } =
    await admin.auth.admin.createUser({
      email: ndaRequest.email,
      password,
      email_confirm: true,
    });

  if (createError || !created.user) {
    return { error: createError?.message ?? "Couldn't create the login." };
  }

  const { error: insertError } = await admin.from("contractors").insert({
    id: created.user.id,
    name: ndaRequest.name,
    email: ndaRequest.email,
    phone: ndaRequest.phone,
    trade: ndaRequest.trade,
    must_change_password: true,
  });

  if (insertError) return { error: insertError.message };

  await admin
    .from("nda_requests")
    .update({ contractor_id: created.user.id })
    .eq("id", ndaRequest.id);

  return { password, email: ndaRequest.email };
}

export async function createJob(formData: FormData) {
  await requireAdmin();
  const supabase = await createClient();

  const ticket = String(formData.get("ticket") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const trade = String(formData.get("trade") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const dayRate = String(formData.get("dayRate") ?? "").trim();
  const duration = String(formData.get("duration") ?? "").trim();
  const callDate = String(formData.get("callDate") ?? "").trim();
  const brief = String(formData.get("brief") ?? "").trim();

  if (!ticket || !title || !trade || !location) {
    return { error: "Ticket, title, trade and location are required." };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("jobs").insert({
    ticket,
    title,
    trade,
    location,
    day_rate: dayRate,
    duration,
    call_date: callDate,
    brief,
    created_by: user!.id,
  });

  if (error) {
    return { error: error.code === "23505" ? "That ticket number is already used." : error.message };
  }

  return { success: true };
}

export async function updateJobStatus(jobId: string, status: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("jobs")
    .update({ status })
    .eq("id", jobId);
  if (error) return { error: error.message };
  return { success: true };
}

export async function awardJob(jobId: string, contractorId: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase
    .from("jobs")
    .update({ status: "awarded", awarded_to: contractorId })
    .eq("id", jobId);
  if (error) return { error: error.message };
  return { success: true };
}

export async function uploadJobFile(jobId: string, formData: FormData) {
  const adminUser = await requireAdmin();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "Choose a file first." };

  const admin = createAdminClient();
  const path = `${jobId}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await admin.storage
    .from("job-files")
    .upload(path, await file.arrayBuffer(), {
      contentType: file.type || "application/octet-stream",
    });

  if (uploadError) return { error: uploadError.message };

  const { error: insertError } = await admin.from("job_files").insert({
    job_id: jobId,
    file_path: path,
    file_name: file.name,
    size_bytes: file.size,
    uploaded_by: adminUser.id,
  });

  if (insertError) return { error: insertError.message };

  return { success: true };
}

export async function deleteJobFile(fileId: string, filePath: string) {
  await requireAdmin();
  const admin = createAdminClient();

  await admin.storage.from("job-files").remove([filePath]);
  const { error } = await admin.from("job_files").delete().eq("id", fileId);

  if (error) return { error: error.message };
  return { success: true };
}

export async function getJobFileUrl(filePath: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in.");

  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from("job-files")
    .createSignedUrl(filePath, 60 * 10);

  if (error || !data) throw new Error(error?.message ?? "Couldn't sign URL.");
  return data.signedUrl;
}

export async function signNda(token: string, signatureName: string) {
  if (!signatureName.trim()) {
    return { error: "Type your full name to sign." };
  }

  const admin = createAdminClient();
  const forwardedFor = (await headers()).get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? null;

  const { data: ndaRequest, error: fetchError } = await admin
    .from("nda_requests")
    .select("id, status")
    .eq("token", token)
    .maybeSingle();

  if (fetchError || !ndaRequest) return { error: "This link isn't valid." };
  if (ndaRequest.status === "signed") {
    return { error: "This has already been signed." };
  }

  const { error } = await admin
    .from("nda_requests")
    .update({
      status: "signed",
      signature_name: signatureName.trim(),
      signed_at: new Date().toISOString(),
      signed_ip: ip,
    })
    .eq("id", ndaRequest.id);

  if (error) return { error: error.message };
  return { success: true };
}
