const projects = require("../model/projectModel");
const users = require("../model/userModel");



//addproject new

exports.addProjectController = async (req, res) => {
    console.log('Inside addProjectController');

    const userId = req.payload; // Extract user ID from the JWT payload
    console.log('User ID:', userId);

    const { title } = req.body; // Extract title from request
    console.log('Project Title:', title);

    const projectImage = req.file?.filename; // Extract filename from Multer, optional chaining for safety
    const fileType = req.file?.mimetype; // Extract MIME type for file, optional chaining for safety

    console.log('Uploaded File:', projectImage, 'File Type:', fileType);

    try {
        if (!title || !projectImage) {
            return res.status(400).json({ message: 'Title and Project Image are required.' });
        }

        // Create new project document
        const newProject = new projects({
            title,
            projectImage,
            fileType, // Save file type
            userId,
        });

        await newProject.save();

        console.log('Project Saved:', newProject);
        return res.status(201).json({ message: 'Project added successfully', project: newProject });
    } catch (error) {
        console.error('Error Adding Project:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};




//get all project

exports.getAllProjectController = async(req,res)=>{

    const searchKey = req.query.search
    console.log(searchKey);

    const query =  {
        title :{
            $regex:searchKey,$options:'i'
        },
    }
    

    try {
        const allProject = await projects.find(query)
        res.status(200).json(allProject)
    } catch (error) {
        res.status(401).json(error)
        
    }
};


//get home Project

exports.getHomeProjectController = async(req,res)=>{
    try {
        const homeproject = await projects.find().limit(3)
        res.status(200).json(homeproject)
    } catch (error) {
        res.status(401),json(error)
        
    }
};


//get userProject

exports.getUserProjectController = async(req,res)=>{
    const userId = req.payload

    try {
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)
        
    } catch (error) {
        res.status(401).json(error)
        
    }
}

//delete project

exports.deleteUserProjectController = async(req,res)=>{
    const {id} = req.params

    try {
        const item = await projects.findByIdAndDelete({_id:id})
        res.status(200).json('deleted successfully')

    } catch (error) {
      res.status(401).json(error)  
    }
}


//editProjectController

  exports.editProjectController = async (req, res) => {
    const { title } = req.body;
    const projectImage = req.file ? req.file.filename : req.body.projectImg;
  
    // Check if at least one field is provided
    if (!title && !req.file) {
      return res.status(400).json({ error: "At least one field (title or projectImg) must be provided." });
    }
  
    const { id } = req.params; // Project ID
    const userId = req.payload; // User ID extracted from JWT
  
    try {
      // Find the project by ID
      const existingProject = await projects.findById(id);
      if (!existingProject) {
        return res.status(404).json({ error: "Project not found" });
      }
  
      // Update only fields provided in the request
      if (title) existingProject.title = title;
      if (req.file) existingProject.projectImage = projectImage;
  
      // Ensure the user is the owner of the project
      if (existingProject.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized action" });
      }
  
      // Save the updated project
      const updatedProject = await existingProject.save();
  
      res.status(200).json(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Failed to update project" });
    }
  };
  
  




 