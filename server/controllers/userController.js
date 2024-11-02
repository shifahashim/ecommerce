const users = require('../models/users/user');

const AddNewUser = async (req, res) => {
    try {
        
        const user = await users.add(req.body); 
        if (!user.success) {
            // If a duplicate email was found
            return res.status(400).json({
              message: user.message,
            });
          }
        res.status(201).json({ success: true, message: "User added successfully", userId: user.user_id });
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: 'Error adding user', error: err.message });
        }
    }
};


module.exports={
    AddNewUser
}