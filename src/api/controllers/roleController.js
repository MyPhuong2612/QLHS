// roleController.js
const Role = require('../../models/roleModel');

const createRole = async (req, res) => {
    try {
        const { name, description } = req.body;
        const role = new Role({ name, description });
        await role.save();
        res.status(201).json({ message: 'Role created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createRole, getRoles };
