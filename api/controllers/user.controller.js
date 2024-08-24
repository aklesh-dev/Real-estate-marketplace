export const test = (req, res) => {
    res.json({ 
        message: 'Hello from controller!',
        test: "This is a test api",
        status: 200,
        method: 'get '
    });
}