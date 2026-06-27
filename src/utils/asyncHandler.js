const asyncHandler =(requestHandler)=>{
    (req,res,next)=>
        {Promise.resolve(requestHandler(req,res,next))
            .catchcatch((err)=>next(err))

}
}
export {asyncHandler}
