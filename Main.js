const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const instream = fs.createReadStream('chicagocrimes.csv');
const outstream = new stream;
const fs1 = require('fs');
let writeStream1 = fs1.createWriteStream('theft1.json');
const fs2 = require('fs'); //module required to read the files
let writeStream2 = fs2.createWriteStream('assault1.json');
const rl = readline.createInterface(instream,outstream);
var lines;
var a = 0;
const theft = new RegExp('(.*)(\,THEFT\,)(.*)');
const over = new RegExp('(.*)(\,OVER)(.*)');
const under = new RegExp('(.*)(AND UNDER\,)(.*)');
const assault = new RegExp('(.*)(\,ASSAULT\,)(.*)');
var class1 = [];
var class2 = [];
for(var i = 2001;i<=2016;i++)
{
	var obj1 = {};
	var obj = {};
	obj.year = i;
	obj.under = 0;
	obj.over = 0;
    obj1.year= i;
    obj1.arrest= 0;
    obj1.noarrest= 0;
    class1.push(obj);
    class2.push(obj1);
}
rl.on('line',function(line)
{
	lines = line.split(',');
	if(theft.test(line)==true)
	{
		if(over.test(line)==true)
		{
			for (i = 0; i < class1.length; i++) 
			{
               if (class1[i].year == lines[17]) 
                   class1[i].over++;
            }
        }    
		else if (under.test(lines) == true) 
		{
        	for (i = 0; i < class1.length; i++) 
        	{     
            	if (class1[i].year == lines[17]) 
                	class1[i].under++;
        	}
        }
    }

    if (assault.test(line) === true) 
    {   
        if (lines[8] === 'true') 
        {      
           for (i = 0; i < class2.length; i++) 
            {
               if (class2[i].year == lines[17]) 
                   class2[i].arrest+=1;
            }
        }
        else if (lines[8] === 'false') 
        {            
            for (i = 0; i < class2.length; i++) 
            {
               if (class2[i].year == lines[17])
                   class2[i].noarrest+=1;
            }

        }
    }  
});
rl.on('close', function() 
{
	var result1 =[];
	var result2 =[];
	result1 = JSON.stringify(class1);
	result2 = JSON.stringify(class2);
	writeStream1.write(result1,'UTF-8');
	writeStream2.write(result2,'UTF-8');
});