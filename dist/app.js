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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
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
    origin: ["http://localhost:3000"],
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
//router
app.use(userRouter_1.default);
app.use("/edit", editRouter_1.default);
app.use("/token", tokenRouter_1.default);
app.listen(port, () => {
    console.log("서버" + port + "에서 작동 중");
});
