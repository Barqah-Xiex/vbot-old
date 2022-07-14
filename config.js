
const fs = require('fs')
const chalk = require('chalk')
databot = {}



// UBAH YANG DI SINI

// TULIS ID BOT USAHAKAN BEDA SAMA ORANG LAIN
// KALO SAMA DENGAN ORANG LAIN
// KEMUNGKINAN BOTMU TERHACK

databot.idbot = "ISI IDBOT USAHAKAN BEDA"
// conoth: "ljkfnh837##"

databot.namabot = "Brainxiex Virtual"
databot.owner = ['628979059392']
databot.premium = ['628979059392']
databot.packname = 'Wa Botz'
databot.author = 'WhatsApp Bot'
databot.sessionName = 'sesi'
databot.prefa = ['','!','.','🐦','🐤','🗿']
databot.sp = '⭔'
databot.mess = {
    success: '✓ Success',
    admin: 'Fitur Khusus Admin Group!',
    botAdmin: 'Bot Harus Menjadi Admin Terlebih Dahulu!',
    owner: 'Fitur Khusus Owner Bot',
    group: 'Fitur Digunakan Hanya Untuk Group!',
    private: 'Fitur Digunakan Hanya Untuk Private Chat!',
    bot: 'Fitur Khusus Pengguna Nomor Bot',
    wait: 'Loading...',
    endLimit: 'Limit Harian Anda Telah Habis, Limit Akan Direset Setiap Jam 12',
}
databot.limitawal = {
    premium: "Infinity",
    free: 100
}
databot.visoka = { url: 'https://telegra.ph/file/15209657f9d4f59c7ca1e.mp4' }







botinfo = {}
Object.keys(databot).forEach(e => {
    botinfo[e] = global[e] = databot[e]
})













let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
