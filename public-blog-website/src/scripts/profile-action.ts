const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");

if (!token || !userData) {
    window.location.href = "/auth/login";
}

const loggedUser = JSON.parse(userData || "{}");

const setText = (id: string, value: string) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
};

const loadProfile = async () => {
    try {
        const res = await fetch(
            `${import.meta.env.PUBLIC_API_BASE_URL}users/data/${loggedUser.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();

        if (!res.ok) {
            localStorage.clear();
            window.location.href = "/auth/login";
            return;
        }

        const user = data.user || data;
        const blogs = data.blogs || [];
        const likes = data.likes || [];
        const comments = data.comments || [];
        const shares = data.shares || [];

        setText("avatar", user.name?.charAt(0).toUpperCase() || "U");
        setText("userName", user.name || "User");
        setText("userEmail", user.email || "-");
        setText("userRole", user.role || "user");
        setText("userStatus", user.status || "-");
        setText("blogsCount", String(blogs.length));
        setText("likesCount", String(likes.length));
        setText("commentsCount", String(comments.length));
        setText("sharesCount", String(shares.length));
    } catch (error) {
        console.error(error);
        alert("Failed to load profile");
    }
};

document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "/auth/login";
});

loadProfile();