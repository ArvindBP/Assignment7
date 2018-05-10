const fs = require('fs');
const readline = require('readline');
const stream = require('stream');
const fs1 = require('fs');
const instream = fs.createReadStream('chicagocrimes.csv');
const outstream = new stream;
let writeStream1 = fs1.createWriteStream('theft1.json');
const fs2 = require('fs'); //module required to read the files
let writeStream2 = fs2.createWriteStream('assault1.json');
const rl = readline.createInterface(instream,outstream);
let lines;
let a = 0;
const theft = new RegExp('(.*)(THEFT)(.*)');
const over = new RegExp('(.*)(OVER)(.*)');
const under = new RegExp('(.*)(AND UNDER)(.*)');
const assault = new RegExp('(.*)(ASSAULT)(.*)');
let class1 = [];
let class2 = [];
for(let i = 2001;i<=2016;i++)
{
	let obj1 = {};
	let obj = {};
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
if (a == 0) 
    {
        headers = line.split(",");
        indexofyear = headers.indexOf("Year");
        indexofprimarytype = headers.indexOf("Primary Type");
        indexofdescription = headers.indexOf("Description");
        indexofarrest = headers.indexOf("Arrest");
        a = 1;
    }
else
{	
	lines = line.split(',');
    if(theft.test(lines[indexofprimarytype])==true)
	{
        if(over.test(lines[indexofdescription])==true)
		{
			for (i = 0; i < class1.length; i++) 
			{
               if (class1[i].year == lines[indexofyear]) 
                   class1[i].over++;
            }
        }    
		else if (under.test(lines[indexofdescription]) == true) 
		{
        	for (i = 0; i < class1.length; i++) 
        	{     
            	if (class1[i].year == lines[indexofyear]) 
                	class1[i].under++;
        	}
        }
    }

    if (assault.test(lines[indexofprimarytype]) === true) 
    {   
        if (lines[indexofarrest] === 'true') 
        {      
           for (i = 0; i < class2.length; i++) 
            {
               if (class2[i].year == lines[indexofyear]) 
                   class2[i].arrest+=1;
            }
        }
        else if (lines[indexofarrest] === 'false') 
        {            
            for (i = 0; i < class2.length; i++) 
            {
               if (class2[i].year == lines[indexofyear])
                   class2[i].noarrest+=1;
            }

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