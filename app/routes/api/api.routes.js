const { Router } = require("express");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const courseRouter = require("./course.routes");
const bannerRouter = require("./banner.routes");
const blogRouter = require("./blog.routes");
const categoryRouter = require("./category.routes");
const commentRouter = require("./comment.routes");
const galleryRouter = require("./gallery.routes");
const aboutRotuer = require("./about.routes");

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/banners", bannerRouter);
apiRouter.use("/courses", courseRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/blogs", blogRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/galleries", galleryRouter);
apiRouter.use("/about", aboutRotuer);

module.exports = apiRouter;
