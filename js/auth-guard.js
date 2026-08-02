// ============================================
// AFRISTAY - Auth Guard
// Include this on every protected page (after supabase-config.js)
// ============================================

const ROLE_HOME = {
  manager: "manager-dashboard.html",
  receptionist: "receptionist-dashboard.html",
  housekeeper: "housekeeper-dashboard.html",
};

async function requireAuth(allowedRoles = []) {
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session) {
    window.location.href = "login.html";
    return null;
  }

  const { data: staffRecord, error } = await supabaseClient
    .from("staff")
    .select("*, hotels ( approval_status, name )")
    .eq("auth_user_id", session.user.id)
    .eq("active", true)
    .single();

  if (error || !staffRecord) {
    await supabaseClient.auth.signOut();
    window.location.href = "login.html";
    return null;
  }

  // Block access entirely if the hotel hasn't been approved by the platform yet
  if (staffRecord.hotels?.approval_status !== "approved") {
    window.location.href = "pending-approval.html";
    return null;
  }

  if (allowedRoles.length && !allowedRoles.includes(staffRecord.role)) {
    // Logged in, but wrong role for this page — send them home
    window.location.href = ROLE_HOME[staffRecord.role] || "login.html";
    return null;
  }

  return staffRecord;
}

async function logout() {
  await supabaseClient.auth.signOut();
  window.location.href = "login.html";
}