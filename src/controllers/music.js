// import models
const {
    music,
    artis
} = require ('../../models')

const cloudinary = require("../utils/cloudynary");

// add music
exports.addMusic = async (req, res) => {

    try {
        const data = req.body;

        const resultImage = await cloudinary.uploader.upload(req.files.thumbnail[0].path, {
            folder: "dumbsong",
            use_filename: true,
            unique_filename: false,
        });
      
          const resultSong = await cloudinary.uploader.upload(req.files.attache[0].path, {
            folder: "dumbsong",
            use_filename: true,
            unique_filename: false,
            resource_type: "video",
        });
    
        const thumbnail = resultImage.public_id
        const attache = resultSong.public_id
  
        const dataUpload ={
          ...data,
          thumbnail,
          attache
        }
        await music.create(dataUpload)
        res.status(200).send({
          status: 'success',
          message: 'Music Successfully Added',
        })
      } catch (error) {
        console.log(error);
        res.send({
          status: "failed",
          message: "failed to add Music",
        });
      }
    // try {
    //     const data = req.body;

    //     const resultImage = await cloudinary.uploader.upload(req.file.thumbnail[0].path, {
    //         folder: "dumbsong",
    //         use_filename: true,
    //         unique_filename: false,
    //     });
      
    //     const resultSong = await cloudinary.uploader.upload(req.files.attache[0].path, {
    //         folder: "dumbsong",
    //         use_filename: true,
    //         unique_filename: false
    //     });


    //     const thumbnail = resultImage.public_id;
    //     const attache = resultSong.public_id;

    //     const dataUpload = {
    //         ...data,
    //         thumbnail,
    //         attache
    //     }

    //     //create data
    //     let newMusic = await music.create(dataUpload)
    //     newMusic = JSON.parse(JSON.stringify(newMusic));
    //     newMusic = {
    //         ...newMusic,
    //     };
        
        
    //     console.log(req.files);
    //     console.log(resultImage);
    //     console.log(resultSong);

    //     res.status(200).send({
    //         status: "success",
    //         message: "Success upload music",
    //         data: {
    //             newMusic
    //         }
    //     })
    // } catch (error) {
    //     console.log(error);
    //     res.status(200).send({
    //         status: "failed",
    //         message: "Server error"
    //     })
    // }
}

// get all music data
exports.getMusics = async (req, res) => {
    try {
        const musics = await music.findAll({
            include: {
                model: artis,
                as: 'artis',
                attributes: {
                    exclude: ["updatedAt", "createdAt"]
                }
            },
            attributes: {
                exclude: ["updatedAt", "createdAt", "idArtis"]
            }
        })

        res.status(200).send({
            status: "success",
            message: "Success get all musics",
            data: {
                musics,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            status: "failed",
            message: "Server error"
        })
    }
}

//get music by id
exports.getMusic = async (req, res) => {
    try {
        //get id
        const { id } = req.params

        const song = await music.findOne({
            where: {
                id
            },
            include: {
                model: artis,
                as: 'artis',
                attributes: {
                    exclude: ["updatedAt", "createdAt"]
                }
            },
            attributes: {
                exclude: ["updatedAt", "createdAt", "idArtis"]
            }
        })

        res.status(200).send({
            status: "success",
            message: 'Success get music',
            data: song
        })
    } catch (error) {
        console.log(error);
        res.status(200).send({
            status: "failed",
            message: "Server error"
        })
    }
}