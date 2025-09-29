async function loadBlogs() {
  const listEl = document.getElementById("blogs");
  const contentEl = document.getElementById("blog-content");

  try {
    const response = await fetch("blogs.json");
    if (!response.ok) throw new Error("Failed to load blogs.json");

    const blogs = await response.json();

    if (!blogs || blogs.length === 0) {
      listEl.innerHTML = "<li>No blogs available yet.</li>";
      contentEl.innerHTML = "<h2>No Blogs</h2><p>Please check back later!</p>";
      return;
    }

    // Fill the list
    blogs.forEach((blog, index) => {
      const li = document.createElement("li");
      li.textContent = blog.title;
      li.addEventListener("click", () => {
        contentEl.innerHTML = `
          <h2>${blog.title}</h2>
          <small>${blog.date}</small>
          <br><br><br><div style = \"padding: 0.3vw;background-color: rgba(0,0,0,0.2); border-radius: 5vh; font-family: helvetica\"><br><br><br>${blog.content}<br><br><br></div>
        `;
      });

      // Auto-load the first blog
      if (index === 0) {
        li.classList.add("active");
        contentEl.innerHTML = `
          <h2>${blog.title}</h2>
          <small>${blog.date}</small>
          <br><br><br><div style = \"padding: 0.3vw;background-color: rgba(0,0,0,0.2); border-radius: 5vh; font-family: helvetica\"><br><br><br>${blog.content}<br><br><br></div>
        `;
      }

      listEl.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    listEl.innerHTML = "<li>⚠️ Error loading blogs</li>";
    contentEl.innerHTML = "<h2>Error</h2><p>Unable to fetch blogs at the moment.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadBlogs);

