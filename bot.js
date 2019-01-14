// this code was given to me by 1988_YumChocolate from the ROBLOX API Server, all credits (as far as I know) go to him



const roblox = require('noblox.js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTM0MDQzMDIyNjU3MTkxOTQ2.Dxz2Aw.WwtC8sP8RtQImotsN85duCtvEf4";

client.login(token)


var cookie = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_422BB497452AF204A9FEC340AA5F4C82128E091E778CD1F6336137BAE4517A03C6B311F091FE3C92BFD592890900DC680F195E573755585C91170009548626B0BCD893787DB5FB5D20E10F7E7027A5C662365C725147216A7211DCF9EA474D62706D236A8B918AE088E804DBB3E9800FF20D841D3D01E2A83C4608D9E8283091898AB2C4527D1B8CC38A48540EB3193C3CFE75EEF432C399CFF26BA01B58FA1E650B859BF40FA7AD1214F7F5304620ACCF48A77302DB98A861582363D721941C4541995A6DF7132BA32E564B7A1BDC01C264681A2247D485FBE9F997F292028DBC7A1C4057C1C041E98CCE991B078CFF483CFA29BE2ECC5DE38E33FD18D67801E63514E0472FD27C4CAB0F03296220FF042437F97BF6507D827E57A82A217159A0F9C2C3A8FC7AECA7EDA12F06177AC558A48BA69D3C28B222A56513CBA7EAD7B6114005";
var prefix = '!';
var groupId = 2789803;
var maximumRank = 255;

function login() {
return roblox.cookieLogin(cookie);
}

login() // Log into ROBLOX
    .then(function() { // After the function has been executed
        console.log('Logged in.') // Log to the console that we've logged in
    })
    .catch(function(error) { // This is a catch in the case that there's an error. Not using this will result in an unhandled rejection error.
        console.log(`Login error: ${error}`) // Log the error to console if there is one.
    });
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}
 
client.on('message', (message) => {
    if (message.author.bot) return; // Dont answer yourself.
    var args = message.content.split(/[ ]+/)
   
    if(isCommand('rank', message)){
       if(!message.member.roles.some(r=>["Hr"].includes(r.name)) ) // OPTIONAL - Checks if the sender has the specified roles to carry on further
        return message.reply("You can't use this command.");
        var username = args[1]
        var rankIdentifier = Number(args[2]) ? Number(args[2]) : args[2];
        if (!rankIdentifier) return message.channel.send("Please enter a rank");
        if (username){
            message.channel.send(`Checking ROBLOX for ${username}`)
            roblox.getIdFromUsername(username)
            .then(function(id){
                roblox.getRankInGroup(groupId, id)
                .then(function(rank){
                    if(maximumRank <= rank){
                        message.channel.send(`${id} is rank ${rank} and not promotable.`)
                    } else {
                        message.channel.send(`${id} is rank ${rank} and promotable.`)
                        roblox.setRank(groupId, id, rankIdentifier)
                        .then(function(newRole){
                            message.channel.send(`Changed rank to ${newRole.Name}`)
                        }).catch(function(err){
                            console.error(err)
                            message.channel.send("Failed to change rank.")
                        });
                    }
                }).catch(function(err){
                    message.channel.send("Couldn't get that player in the group.")
                });
            }).catch(function(err){
                message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
           });
       } else {
           message.channel.send("Please enter a username.")
       }
       return;
   }
})