"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const editRouter_1 = __importDefault(require("./router/editRouter"));
const tokenRouter_1 = __importDefault(require("./router/tokenRouter"));
const fixRouter_1 = __importDefault(require("./router/fixRouter"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// HerokuPort연동을 위한 env.Port
const port = process.env.PORT || 8080;
// DB Connect
mongoose_1.default
    .connect(`mongodb+srv://kimdev9612:${process.env.DBKEY}@cluster0.2mck3wn.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
    console.log("MongoDB 연결완료");
})
    .catch((err) => {
    console.log("MongoDB 연결 오류 : ", err);
});
// CORS
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://financial-ledger-ten.vercel.app",
        "https://merry-lollipop-bda320.netlify.app",
        "https://ggb-service.netlify.app",
    ],
    credentials: true,
}));
// body-parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body);
    next();
});
// cookie-parser
app.use((0, cookie_parser_1.default)());
//router
app.use(userRouter_1.default);
app.use("/edit", editRouter_1.default);
app.use("/token", tokenRouter_1.default);
app.use("/fix", fixRouter_1.default);
// aws LB healthCheck
app.get("/", (req, res) => {
    res.status(200).json({ message: "정상적으로 작동합니다." });
});
app.listen(port, () => {
    console.log("서버" + port + "에서 작동 중");
});
// heroku github deploy
