console.log("Conectando...");
const Discord = require("discord.js");
bot = new Discord.Client();

const PREFIX = "!";

bot.login(process.env.TOKEN);

//ready & Gamer bot//
bot.on("ready", async => {
    console.log(`${bot.user.username} Conectado com sucesso!`)
    console.log(`${bot.user.id}`)
    bot.user.setPresence({ status: 'STREAMING', game: { name: `shop.alvim.com`, url: "https://www.twitch.tv/gustavoluii"}});
});

//commands & events//
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;


    let prefix = PREFIX;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}ping`) {
        if (!message.member.hasPermission("ADMINISTRATOR"));
        message.channel.send(`:exclamation:| Meu ping está ${Date.now() - message.createdTimestamp} ms.`)
        
    }

    
    
        if(cmd === `${prefix}ban`){
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("`❌ Membro não encontrado`").then(msg => msg.delete(10000));
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("`❌ Você não tem permissão!`");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("`❌ Eu não posso banir essa pessoa.`");
     
        let banEmbed = new Discord.RichEmbed()
        .setThumbnail(bUser.user.displayAvatarURL)
        .addField("`👤 | Membro Banido:`", `${bUser}`, true)
        .addField("`👨‍💼 | Banido por:`", `<@${message.author.id}>`, true)
        .addField("`📦 | Membro ID:`", `${bUser.id}`, true)
        .addField("`📋 | Banido no canal:`", `${message.channel}`, true)
        .addField("`📂 | Motivo:`", `${bReason}`, true)
        .setColor("#b70f0f")
     
        let incidentchannel = message.guild.channels.find(c => c.name == "punições");
        if(!incidentchannel) return message.channel.send("`❌ Não foi possível encontrar o canal de punições.`");
        
        message.delete();
        message.guild.member(bUser).ban(bReason);
        incidentchannel.send(banEmbed);
        message.channel.send("`🔴 Membro Banido!`").then(msg => msg.delete(10000));
        return;
      }

    if(cmd === `${prefix}limpar`){

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    if(!args[0]) return message.channel.send("Especifique quantas linhas.").then(msg => msg.delete(5000));
      message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`Limpei ${args[0]} mensagens.`).then(msg => msg.delete(5000));
    });
    }

    if(cmd === `${prefix}anunciar`){
        if (message.member.hasPermission("ADMINISTRATOR")) {

            const text = args.slice(0.5).join(" ");
             if (text.length < 0.5) return message.channel.send("Você precisa por alguma mensagem!").then((value) => {
               setTimeout(() => {
                    value.delete();
                }, 3000);
            });
            const embed = new Discord.RichEmbed()
            .setColor(COR)
            .setAuthor(`Anúncio - ${message.guild.name}`, "https://i.imgur.com/qX4nK3l.gif")
            .setFooter(`Anúncio feito por: ${message.author.username}`, message.member.user.displayAvatarURL)
            .setTimestamp(new Date())
            .setDescription(text);
            message.channel.send("@everyone")
            message.delete().catch();
            message.channel.send({embed}).then(msg=> {
            msg.react('📢');
                
          });
        }
    }

    
    if(cmd === `${prefix}cliente`) { 
        if(!message.member.hasPermission("MANAGE_ROLES")) return;
        let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if(!rMember) return message.reply("`❌ Não foi possível encontrar esse usuário.`").then(a=>a.delete(5000));
        let gRole = message.guild.roles.find(c => c.name == `💸 Clientes`);
  
        if(rMember.roles.has(gRole.id)) return message.reply("`❌ Esse membro já possui um cargo.`").then(a=>a.delete(5000));
        await(rMember.addRole(gRole.id));
        message.delete();
        message.channel.send(`\`⭐ | ${rMember.user.username} Foi definido como 💸 Cliente!\``); //.then(a=>a.delete(15000));
  
        try{
            let msg = new Discord.RichEmbed()
            .setDescription("Parabéns! Agora você é um `💸 Cliente` em nossa loja :slight_smile:\n\n:tickets: **__Referências__**:\nAgora você pode deixar seu opinião em nosso canal de referências contando como foi sua experiência com nossa loja :wink:\n\n:star: **__Privilégios:__**\nAgora você possui acesso ao nosso canal de chat/voz e ao nosso Discord exclusivo para clientes!\n\n<:checklist:497189747865944074> **__Informações:__**\n**Site:** [__valleyshop.com.br__](https://valleyshop.com.br/)\n**Twitter:** [__@LojaValleyShop__](https://twitter.com/lojaValleyShop)\n**Discord Clientes:** __https://discord.gg/7E8MMnk__")
            .setColor(COR)
            await rMember.send(msg)
        }catch(e){
            message.channel.send(` `)
        }
  
        return;
    }

});
