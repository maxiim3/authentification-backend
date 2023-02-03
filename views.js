
const htmlTemplate = (title, content) => {
    return `
    <style>
        body{
            display: grid;
            place-content: center;
            background: #edeaea;
        }
        .container {
            display: flex;
            flex-flow: column;
            text-align: center;
            gap: 8px;
            justify-content: center;
            width: 350px;
            height: 320px;
            border-radius: 12px;
            background-color: #f8f4f4;
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        }
        
        .title {
            font-size: 1.5rem;
            font-weight: 600;
            color: orange;
        }
        
        .content {
            font-size: 1rem;
            font-weight: 400;
            color: black;
        }
    </style>
    
      <article class="container">  
        <h1 class="title">${title}</h1>
        <p class="content">${content}</p>
    </article>
    `;
}

const courses = [
    {id: 1, title: htmlTemplate("First Post", "This is the first post")},
    {id: 2, title: htmlTemplate("Second Post", "This is the second post")},
    {id: 3, title: htmlTemplate("Third Post", "This is the third post")},
]

module.exports.posts = {courses, htmlTemplate}