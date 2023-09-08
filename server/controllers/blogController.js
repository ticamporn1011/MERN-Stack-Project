// ติดต่อกับฐานข้อมูล และ ดำเนินการกับฐานข้อมูล
const slugify = require("slugify");
const Blogs = require("../models/blogs");
const { v4: uuidv4 } = require("uuid");

// บันทึกข้อมูล
exports.create = (req, res) => {
  const { title, content, author } = req.body;
  let slug = slugify(title);

  if (!slug) {
    slug = uuidv4();
  }

  switch (true) {
    case !title:
      return res.status(400).json({ error: "กรุณาป้อนชื่อบทความ" });
      break;
    case !content:
      return res.status(400).json({ error: "กรุณาป้อนเนื้อหาบทความ" });
      break;
  }

  Blogs.create({ title, content, author, slug })
    .then((blog) => {
      res.json(blog);
    })
    .catch(() => {
      res.status(400).json({ error: "มีชื่อบทความนี้แล้ว" });
    });
};

// ดึงข้อมูลบทความทั้งหมด
exports.getAllBlogs = (req, res) => {
  Blogs.find({})
    .exec()
    .then((blogs) => {
      res.json(blogs);
    });
};

// ดึงบทความที่สนใจอ้างอิงตาม slug
exports.singleBlog = (req, res) => {
  const { slug } = req.params;
  Blogs.findOne({ slug })
    .exec()
    .then((blog) => {
      res.json(blog);
    });
};

exports.remove = (req, res) => {
  const { slug } = req.params;
  Blogs.findOneAndRemove({ slug })
    .exec()
    .then(() => {
      res.json({
        message: "ลบบทความเรียบร้อย",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.update = (req, res) => {
  const { slug } = req.params;
  // ส่งข้อมูล => title , content, author
  const { title, content, author } = req.body;
  Blogs.findOneAndUpdate({ slug }, { title, content, author }, { new: true })
    .exec()
    .then((blog) => {
      res.json(blog);
    })
    .catch((err) => {
      console.log(err);
    });
};
