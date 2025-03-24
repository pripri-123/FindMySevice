import mongoose from 'mongoose';

const mongoURI = 'mongodb+srv://vaishnavdv26:Waasup%402025@cluster0.iktas.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(mongoURI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true // 👈 Add this option
    })
    .then(() => console.log('Connected successfully'))
    .catch(e => console.error('Connection error', e.message));

const db = mongoose.connection;
export default db; // Use ES module export
