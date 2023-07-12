
export const addUser = async (req, res) => {
    try {

    }
    catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};