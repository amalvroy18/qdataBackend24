const users = require("../model/userModel");
const jwt = require('jsonwebtoken')


//register
exports.registerController = async(req,res)=>{
console.log('inside register controller');

const {username , email , password} = req.body
console.log(username , email , password);
try {
    const existingUser =  await users.findOne({email})
    if(existingUser){
        res.status(406).json('Account already exist')
    }else{
        const newUser = new users({
            username,
            email,
            password,
            /* github:"",
            linkedin:"", */
            profile:""
        })
        await newUser.save()
        res.status(200).json(newUser)
    }
    
} catch (error) {
    res.status(401).json(error)
    
}

}

//login
exports.loginController = async(req,res)=>{
    console.log('inside login controller');
    
    const {email, password} = req.body
    console.log(email, password);

    try {
        const existingUser = await users.findOne({email,password})
        if (existingUser){
            const token = jwt.sign({userId:existingUser._id},"supersecretekey")
            res.status(200).json({existingUser,token})            
        } else {
            res.status(406).json('Account does not exist')
            
        }
        
    } catch (error) {
        res.status(401).json(error)
        
    }
    
}

//edit profile controller

exports.editProfileController = async (req, res) => {
    const userId = req.payload;
    const { username, email, password } = req.body;
    const uploadImg = req.file ? req.file.filename : req.body.profile; // Fallback to existing image

    try {
        const updatedUser = await users.findByIdAndUpdate(
            userId,
            {
                username,
                email,
                password,
                profile: uploadImg,
            },
            { new: true } // Return updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

