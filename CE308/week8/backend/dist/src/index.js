"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../lib/prisma");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/api/books', async (req, res) => {
    const { title, author, description, price } = req.body;
    try {
        const book = await prisma_1.prisma.book.create({
            data: {
                title,
                author,
                description,
                price,
            },
        });
        res.status(201).json(book);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the book.' });
    }
});
app.get('/api/books', async (req, res) => {
    try {
        const books = await prisma_1.prisma.book.findMany();
        if (books.length === 0) {
            return res.json([]);
        }
        else {
            res.json(books);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching books.' });
    }
});
app.get('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await prisma_1.prisma.book.findUnique({
            where: { bookId: id },
        });
        if (book) {
            res.json(book);
        }
        else {
            res.status(404).json({ error: 'book not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching books.' });
    }
});
app.put('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, description, price } = req.body;
    try {
        const book = await prisma_1.prisma.book.update({
            where: { bookId: id },
            data: {
                title,
                author,
                description,
                price,
            },
        });
        res.json(book);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while update the books.' });
    }
});
app.delete('/api/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma_1.prisma.book.delete({
            where: { bookId: id },
        });
        res.status(204).send();
    }
    catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'book not found' });
        }
        else {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while deleting the books.' });
        }
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map