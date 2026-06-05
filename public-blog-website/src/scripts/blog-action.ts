const API_URL = import.meta.env.PUBLIC_API_BASE_URL;

const getToken = (): string | null => {
	return localStorage.getItem("token");
};

const redirectToLogin = (): void => {
	alert("Please login first");
	window.location.href = "/auth/login";
};

const escapeHtml = (value: string): string => {
	return value.replace(/[&<>"]/g, (char) => {
		const map: Record<string, string> = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
		};

		return map[char] || char;
	});
};

type BlogComment = {
	id: number;
	text: string;
	user?: {
		name?: string;
		email?: string;
	};
	createdAt?: string;
};

const loadComments = async (blogId: string): Promise<void> => {
	const commentsList = document.getElementById("commentsList");

	if (!commentsList) return;

	commentsList.innerHTML = `<p style="color:#888;text-align:center;">Loading comments...</p>`;

	try {
		const res = await fetch(`${API_URL}comments/blog/${blogId}`);
		const data = await res.json();

		const comments: BlogComment[] = data.comments || data.data || [];

		if (!comments.length) {
			commentsList.innerHTML = `<p style="color:#888;text-align:center;">No comments yet. Be the first one.</p>`;
			return;
		}

		commentsList.innerHTML = comments
			.map(
				(comment) => `
					<div class="comment-item">
						<strong>${escapeHtml(comment.user?.name || "User")}</strong>
						<p>${escapeHtml(comment.text)}</p>
					</div>
				`,
			)
			.join("");
	} catch (error) {
		commentsList.innerHTML = `<p style="color:red;text-align:center;">Failed to load comments.</p>`;
	}
};

const initLikeButton = (): void => {
	const likeBtn = document.getElementById("likeBtn") as HTMLButtonElement | null;
	const likeCount = document.getElementById("likeCount");

	if (!likeBtn || !likeCount) return;

	likeBtn.addEventListener("click", async () => {
		const blogId = likeBtn.dataset.blogId;
		const token = getToken();

		if (!blogId) return;

		if (!token) {
			redirectToLogin();
			return;
		}

		try {
			const res = await fetch(`${API_URL}likes/${blogId}/toggle`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			if (!res.ok) {
				alert(data.message || "Failed to like blog");
				return;
			}

			likeCount.textContent = String(data.likesCount ?? 0);

			if (data.liked) {
				likeBtn.classList.add("liked");
			} else {
				likeBtn.classList.remove("liked");
			}
		} catch (error) {
			alert("Something went wrong");
		}
	});
};

const initCommentModal = (): void => {
	const commentBtn = document.getElementById("commentBtn") as HTMLButtonElement | null;
	const commentModal = document.getElementById("commentModal");
	const closeBtn = document.getElementById("closeCommentModal");
	const commentForm = document.getElementById("commentForm") as HTMLFormElement | null;
	const commentText = document.getElementById("commentText") as HTMLTextAreaElement | null;
	const commentCount = document.getElementById("commentCount");

	if (!commentBtn || !commentModal || !commentForm || !commentText) return;

	commentBtn.addEventListener("click", async () => {
		const blogId = commentBtn.dataset.blogId;
		if (!blogId) return;
		commentModal.classList.add("show");
		await loadComments(blogId);
	});

	closeBtn?.addEventListener("click", () => {
		commentModal.classList.remove("show");
	});

	commentForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const blogId = commentBtn.dataset.blogId;
		const token = getToken();
		if (!blogId) return;
		if (!token) {
			redirectToLogin();
			return;
		}
		const text = commentText.value.trim();
		if (!text) return;
		try {
			const res = await fetch(`${API_URL}comments/blog/${blogId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ text }),
			});
			const data = await res.json();
			if (!res.ok) {
				alert(data.message || "Failed to add comment");
				return;
			}
			commentText.value = "";
			const currentCount = Number(commentCount?.textContent || 0);
			if (commentCount) {
				commentCount.textContent = String(currentCount + 1);
			}
			await loadComments(blogId);
		} catch (error) {
			alert("Something went wrong");
		}
	});
};

const initShareButton = (): void => {
	const shareBtn = document.getElementById("shareBtn") as HTMLButtonElement | null;
	const shareCount = document.getElementById("shareCount");

	if (!shareBtn) return;

	const recordShare = async (blogId: string) => {
		const token = getToken();
		const res = await fetch(`${API_URL}shares/blog/${blogId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				platform: typeof navigator.share === "function"
				   ? "native-share"
				   : "copy-link"
			}),
		});

		const data = await res.json();

		if (shareCount && data.sharesCount !== undefined) {
			shareCount.textContent = String(data.sharesCount);
		}
	};

	shareBtn.addEventListener("click", async () => {
		const blogId = shareBtn.dataset.blogId;
		if (!blogId) return;

		try {
			await recordShare(blogId);

			if (navigator.share) {
				await navigator.share({
					title: document.title,
					url: window.location.href,
				});
			} else {
				await navigator.clipboard.writeText(window.location.href);
				alert("Link copied to clipboard!");
			}
		} catch (error) {
			console.error("Share failed:", error);
		}
	});
};

document.addEventListener("DOMContentLoaded", () => {
	initLikeButton();
	initCommentModal();
	initShareButton();
});