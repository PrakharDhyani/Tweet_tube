const asyncHandler = (fn)=>{
    (req,res,next)=>{
        Promise.resolve(fn(req,res,next)).
        catch((err)=>next(req,res,next));
    }
};




// wrapper function via try and catch
// const asyncHandler = (func) =>async (req,res,next)=> {
//     try {
//         await func(req,res,next);
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success : false,
//             message : error.message
//         })
//     }
// };

// export { asyncHandler };
