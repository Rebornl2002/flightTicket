import Login from '../models/login.js';

export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Login.find({});

        if (accounts.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Successfully',
                data: accounts,
            });
        } else {
            throw new Error('No accounts found');
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const addAdmin = async (req, res) => {
    try {
        const newAdmin = new Login({
            AccountName: req.body.AccountName,
            Password: req.body.Password,
            Name: req.body.Name,
            DayOfBirth: req.body.DayOfBirth,
            Role: req.body.Role,
        });

        await newAdmin.save();
        res.status(200).json({ success: true, message: 'Success created' });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};

export const deleteAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        await Login.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete. Try again ',
        });
    }
};

export const updateAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedAdmin = await Login.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedAdmin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};

export const getMyAccount = async (req, res) => {
    const accountName = new RegExp(`^${req.query.AccountName}$`);

    try {
        const accounts = await Login.find({
            AccountName: accountName,
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: accounts.length,
            data: accounts,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found booked',
        });
    }
};
