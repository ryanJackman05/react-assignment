import React, { useEffect, useRef, useState } from "react";

const profileObjectName = "userProfile_v1";
const DEFAULT_AVATAR =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='8' r='3'/><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/></svg>`
  ); // svg tag was generated with this code, I understand it just defines the image size

function loadProfile() {
  try {
    const raw = localStorage.getItem(profileObjectName);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveProfile(profile) {
  try {
    localStorage.setItem(profileObjectName, JSON.stringify(profile));
  } catch {
    // ignore quota errors
  }
}

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: DEFAULT_AVATAR,
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const saved = loadProfile(); // ...profile : returns new profile object with existing fields
    if (saved) setProfile({ ...profile, ...saved });
  }, []);

  useEffect(() => { // This one will persist on every change ([profile])
    saveProfile(profile);
  }, [profile]);

  function handleFieldChange(e) {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  }

  function handleClickAvatar() {
    fileInputRef.current?.click();
  }

  function handleImageChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((p) => ({ ...p, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
    // clear input so same file can be selected again later
    e.target.value = "";
  }

  function handleRemoveAvatar() {
    setProfile((p) => ({ ...p, avatar: DEFAULT_AVATAR }));
  }

  function handleReset() {
    const cleared = { name: "", email: "", bio: "", avatar: DEFAULT_AVATAR };
    setProfile(cleared);
  }

  return (
    <div style={styles.page}>
      <h2 style={{ marginTop: 0 }}>Profile</h2>
      <div style={styles.card}>
        <div style={styles.avatarColumn}>
          <img
            src={profile.avatar || DEFAULT_AVATAR}
            alt="avatar"
            style={styles.avatar}
            onClick={handleClickAvatar}
            title="Click to change"
          />
          <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
            <button type="button" onClick={handleClickAvatar} style={styles.button}>
              Change
            </button>
            <button type="button" onClick={handleRemoveAvatar} style={styles.button}>
              Remove
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <div style={styles.formColumn}>
          <label style={styles.label}>
            Name
            <input
              name="name"
              value={profile.name}
              onChange={handleFieldChange}
              style={styles.input}
              placeholder="Full name"
            />
          </label>

          <label style={styles.label}>
            Email
            <input
              name="email"
              value={profile.email}
              onChange={handleFieldChange}
              style={styles.input}
              placeholder="you@example.com"
            />
          </label>

          <label style={styles.label}>
            Bio
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleFieldChange}
              style={{ ...styles.input, height: 96 }}
              placeholder="A short bio..."
            />
          </label>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button type="button" onClick={() => saveProfile(profile)} style={styles.buttonPrimary}>
              Save
            </button>
            <button type="button" onClick={handleReset} style={styles.button}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = { // generated styles object
  page: { padding: 16, maxWidth: 900, margin: "0 auto", fontFamily: "system-ui, Arial" },
  card: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
    background: "#fff",
    borderRadius: 8,
    padding: 20,
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  avatarColumn: { width: 160, textAlign: "center" },
  avatar: { width: 120, height: 120, objectFit: "cover", borderRadius: 8, cursor: "pointer", border: "1px solid #e6e6e6" },
  formColumn: { flex: 1, display: "flex", flexDirection: "column" },
  label: { display: "flex", flexDirection: "column", marginBottom: 10, fontSize: 14 },
  input: { padding: 8, marginTop: 6, borderRadius: 6, border: "1px solid #ddd", fontSize: 14 },
  button: { padding: "8px 12px", borderRadius: 6, border: "1px solid #ddd", background: "#f7f7f7", cursor: "pointer" },
  buttonPrimary: { padding: "8px 12px", borderRadius: 6, border: "none", background: "#0066ff", color: "#fff", cursor: "pointer" },
};