"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTest = void 0;
const fetchTest = (req, res) => {
    return res.status(200).json({ message: "테스트 성공" });
};
exports.fetchTest = fetchTest;
