// src/index.ts
//import { UdpService } from './UdpService';
import { SocketService } from './SocketService';

//const UDP_PORT = 4210;
//const WEB_PORT = 3001;
const PORT = Number(process.env.PORT) || 3001;
// 1. Hidupkan Service
// const udp = new UdpService(UDP_PORT);
// const web = new SocketService(WEB_PORT);
const service = new SocketService();
// 2. Sambungkan Keduanya (Logic Jembatan)
// "Saat UDP dapat data -> Suruh Web broadcast data itu"
// udp.on('data-received', (motionData) => {
//     // Kirim ke browser dengan nama event 'motion_data'
//     web.broadcast('motion_data', motionData);
    
//     // Debugging (Opsional)
//     console.log('Relaying:', motionData);
// });

// console.log('--- SYSTEM MOTION CAPTURE AKTIF ---');
service.app.post('/api/motion', (req, res) => {
    const motionData = req.body;
    if (!motionData || typeof motionData !== 'object') {
        return res.status(400).send({ status: 'error', message: 'Invalid motion data' });
    }
    service.broadcast('motion_data', motionData);
    console.log('Received motion data:', motionData);
    res.send({ status: 'success', message: 'Motion data broadcasted' });
});

service.listen(PORT);