const router = require('express').Router();
const { User } = require('../../models');

const loginUser = async (userId) => {
    await req.session.save(() => {
        req.session.user_id = userId;
        req.session.logged_in = true;
    });
}

router.get('/', async (req, res) => {
    const users = await User.findAll({});

   return res.json(users);
});

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
    // check if there is an email or password
    if (!email || !password) {
        return res.status(406).json({ message: 'A email and password must be provided!' });
    }

    // 1.check if users email is in the db
    const existingUser = await User.findOne({ where: email });

    // 2. if it is present, return an error message
    if (existingUser) {
        return res.status(406).json({ message: 'This user already has an account!' });
    }

    // 3. Create user 
    const userData = await User.create({ name, email, password });


    // 4. add the user_id and logged_in variables to the req.session (login in user globally using session variables)
    loginUser(userData.id);

    // 5. return the user in the db with the correct email and password along an success message
    return res.status(204).json({ user: userData, message: 'You are successfully signed up!' });

    } catch (err) {
        return res.status(400).json({ message: 'Something went wrong. Please try again later.' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // check if there is an email or password
        if (!email || !password) {
            return res.status(406).json({ message: 'A email and password must be provided!' });
        }

        // 1.check if users email is in the db
        const userData = await User.findOne({ where: { email } });

        // 2. if it is not present, return an error message
        if (!userData) {
            return res.status(404).json({ message: 'A user with this email was not found!' });
        }

        // 3. compare users password to what is in the db using the checkPassword method
        const validPassword = userData.checkPassword(password);

        // 4. if the password does not patch, return error message
        if (!validPassword) {
        return res.status(406).json({ message: 'The provided password was incorrect!' });
        } 

        // 5. add the user_id and logged_in variables to the req.session (login in user globally using session variables)
        loginUser(userData.id);

        // 6. return the user in the db with the correct email and password along an success message
        res.status(202).json({ user: userData, message: 'You are successfully logged in!' });
    } catch (err) {
        return res.status(400).json({ message: 'Something went wrong. Please try again later.' });
    }
});


router.post('/logout', async (req, res) => {
    // 1. remove all 
    req.session.destroy();

    console.log('req.session.user_id', req.session.user_id,'req.session.logged_in', req.session.logged_in);

    return res.status(204).json({ message: 'You are successfully logged out!' });
});

module.exports = router;