const express = require('express');
const router = express.Router();


router.post('/',  async (req, res)=>{
	
	#receive string
	
	var meg;
	
	  const { spawn } = require("child_process");
	  console.log("wtf");
	  const pyProg = spawn('python', ['./../prototying_web_crawler.py', msg]);
	      pyProg.stdout.on('data', function(data) {

        console.log(data.toString());
        res.write(data);
        res.end('end');
    });
	
});

module.exports = router;