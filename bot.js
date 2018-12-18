console.log("Conectando...");
const Discord = require("discord.js");
const bot = new Discord.Client({fetchAllMembers: true});

const PREFIX = "!";
const COR = "#009900";

bot.login(process.env.TOKEN);

bot.on("ready", async => {
    console.log(`========================`)
    console.log(`${bot.user.username}`);
    console.log(`${bot.user.id}`);
    console.log(`Membros: ${bot.users.size}`)
    console.log(`========================`)

    setInterval(function() {
    let statusale = ["Minecraft Original", "Minecraft Original"];
    let status = statusale[Math.floor(Math.random()*statusale.length)];
    bot.user.setPresence({ status: 'STREAMING', game: { name: status, url: "https://www.twitch.tv/zjvplays"}});
    bot.user.setPresence({ status: 'STREAMING', game: { name: status, url: "https://www.twitch.tv/zjvplays"}});
    }, 60000)
});

bot.on("guildMemberAdd", member => {
    console.log(`${member.user.username} entrou no servidor.`);
    var role = member.guild.roles.find("name", "🌚 Membro");
    member.addRole(role)
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;


    let prefix = PREFIX;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

if(cmd === `${prefix}skin`){
    let reason = args.slice(0).join(' ');
    if (reason.length < 1) return message.reply("`❌ Use: !skin <nick>`");

    let skinembed = new Discord.RichEmbed()
    .setImage(`https://mc-heads.net/body/${args[0]}`)
    .setColor(COR)
    message.channel.send(skinembed);

}

if(cmd === `${prefix}head`){
    let reason = args.slice(0).join(' ');
    if (reason.length < 1) return message.reply("`❌ Use: !head <nick>`");

    let skinembed = new Discord.RichEmbed()
    .setImage(`https://mc-heads.net/head/${args[0]}`)
    .setColor(COR)
    message.channel.send(skinembed);

}

if(cmd === `${prefix}avatar`){
    let reason = args.slice(0).join(' ');
    if (reason.length < 1) return message.reply("`❌ Use: !avatar <nick>`");

    let skinembed = new Discord.RichEmbed()
    .setImage(`https://mc-heads.net/avatar/${args[0]}`)
    .setColor(COR)
    message.channel.send(skinembed);

}

        if(cmd === `${prefix}a`){
        message.channel.send(new Discord.RichEmbed().setColor(COR).setDescription("**Está com problemas ou dúvidas? clique na reação que deseja e aguarde o suporte.**\n\n:Steve: - Problemas com a sua conta.\n:Boleto: - Problemas com compras\n:Cliente: Solicitar TAG cliente.\n:form: Outras dúvidas.")).then(async msg => {
            const emoji = bot.emojis.find(c => c.name == "Steve");
            const emoji2 = bot.emojis.find(c => c.name == "Boleto");
            const emoji3 = bot.emojis.find(c => c.name == "Cliente");
            const emoji4 = bot.emojis.find(c => c.name == "form");
            await msg.react(emoji)
            await msg.react(emoji2)
            await msg.react(emoji3)
            await msg.react(emoji4)
            const collector = msg.createReactionCollector((r, u) => (r.emoji.name === "Steve", "Boleto", "Cliente", "form" && u.id === message.author.id))
            collector.on("collect", async r => {
                let title
                switch (r.emoji.name) {
                    case "Steve":
                        title = "Conta"
                        break
                    case "Boleto":
                        title = "Pagamentos"
                        break
                    case "Cliente":
                        title = "Cliente"
                        break
                    case "form":
                        title = "Dúvidas"
                }

                let category = message.guild.channels.find(c => c.name === "tickets")
                if (!category || category.type !== "category")
                    category = await message.guild.createChannel("tickets", "category")
                let channel = await message.guild.createChannel(`ticket-${title}`, "text", [{
                    id: bot.user.id,
                    allowed: ["VIEW_CHANNEL", "MANAGE_CHANNELS"]
                }, {
                    id: message.author.id,
                    allowed: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                }, {
                    id: message.guild.roles.find(c => c.name === "👤 Suporte").id,
                    allowed: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                }, {
                    id: message.guild.defaultRole.id,
                    denied: Discord.Permissions.ALL
                }])
                await channel.setParent(category.id)
            })
        })
    }
    
    if(cmd === `${prefix}fecharticket`){
        if (message.member.hasPermission("MANAGE_MESSAGES")){
        message.channel.delete();
        }
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
 
    let incidentchannel = message.guild.channels.find(c => c.name == "🔴punições");
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

if(cmd === `${prefix}mute`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("❌ | Você não tem permissão!")
    
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.sendMessage("Você não especificou o membro.");

    let role = message.guild.roles.find(r => r.name === "🔇 Mutado");
    if(!role) {
      try{
        role = await message.guild.createRole({
          name: "🔇 Mutado",
          color: "#030303",
          permissions: []
        });

        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
           });
        });
      } catch(e) {
          console.log(e.stack);
      }
    }
  if(toMute.roles.has(role.id)) return message.channel.sendMessage("Membro mutado com sucesso.");
  
  await toMute.addRole(role);
  message.channel.sendMessage("🔇 | Membro Mutado!");
  
    return;
}

if(cmd === `${prefix}cliente`) { 
    if(!message.member.hasPermission("MANAGE_ROLES")) return;
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("`❌ Não foi possível encontrar esse usuário.`").then(a=>a.delete(5000));
    let gRole = message.guild.roles.find(c => c.name == `💳 Clientes`);

    if(rMember.roles.has(gRole.id)) return message.reply("`❌ Esse membro já possui um cargo.`").then(a=>a.delete(5000));
    await(rMember.addRole(gRole.id));
    message.delete();
    message.channel.send(`\`⭐ | ${rMember.user.username} Foi definido como 💳 Cliente!\``); //.then(a=>a.delete(15000));

    try{
        let msg = new Discord.RichEmbed()
        .setDescription("Parabéns! Agora você é um `💸 Cliente` em nossa loja :slight_smile:\n\n:tickets: **__Referências__**:\nAgora você pode deixar seu opinião em nosso canal de referências contando como foi sua experiência com nossa loja :wink:")
        .setColor(COR)
        await rMember.send(msg)
    }catch(e){
        message.channel.send(` `)
    }

    return;
}


if(cmd === `${prefix}cargo`){ 
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("`❌ Você não tem permissão!`");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("`❌ Membro não encontrado`");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("`❌ Informe o cargo!`");
  let gRole = message.guild.roles.find(c => c.name == role);
  if(!gRole) return message.reply("`❌ Eu não encontrei esse cargo.`");

  if(rMember.roles.has(gRole.id)) return message.reply("`❌ Esse membro já possui esse cargo.`");
  await(rMember.addRole(gRole.id));
  message.delete();
  message.channel.send("`✅ Cargo definido com sucesso!`");

  try{
    await rMember.send("Parabéns, agora você possui o cargo `" + gRole.name +"` em nosso Discord.")
  }catch(e){
    message.channel.send()
  }

  return;
}

if(cmd === `${prefix}testeban`){
    if(message.author.id !== "231611977053503488") return;
    let testeban = new Discord.RichEmbed()
    .setThumbnail(message.author.displayAvatarURL)
    .addField("`👤 | Membro Banido:`", `<@231611977053503488>`, true)
    .addField("`👨‍💼 | Banido por:`", `<@231611977053503488>`, true)
    .addField("`📦 | Membro ID:`", `231611977053503488`, true)
    .addField("`📋 | Banido no canal:`", `${message.channel}`, true)
    .addField("`📂 | Motivo:`", `Estou testando! isso é apenas uma mensagem de teste.`, true)
    .setColor("#b70f0f")
    message.channel.send(testeban);

}

});
