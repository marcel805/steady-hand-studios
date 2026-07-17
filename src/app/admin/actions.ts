"use server";

import { randomBytes } from "crypto";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

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

export async function createContractor(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const trade = String(formData.get("trade") ?? "").trim();

  if (!name || !email) {
    return { error: "Name and email are required." };
  }

  const password = generatePassword();
  const admin = createAdminClient();

  const { data: created, error: createError } =
    await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (createError || !created.user) {
    return { error: createError?.message ?? "Couldn't create the login." };
  }

  const { error: insertError } = await admin.from("contractors").insert({
    id: created.user.id,
    name,
    email,
    phone: phone || null,
    trade: trade || null,
    must_change_password: true,
  });

  if (insertError) {
    return { error: insertError.message };
  }

  return { password, email };
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
