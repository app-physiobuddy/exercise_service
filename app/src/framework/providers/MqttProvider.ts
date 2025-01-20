import mqtt from 'mqtt';
import { Exercise } from '../../application/entities/Entities';

const host = process.env.EMQX_BROKER_SERVICE_HOST 
const port = process.env.EMQX_PORT
const username = process.env.EMQX_USER
const password = process.env.EMQX_PASSWORD

class MqttProvider {
    private client: mqtt.MqttClient;
    constructor() {
        this.client = mqtt.connect({
            host: host,
            port: Number(port),
            protocol: 'mqtt',
            username: username, 
            password: password
          });
        this.client.on('connect', () => {
            console.log('Connected to MQTT broker');
        })
        this.client.on('error', (error) => {
            console.error('MQTT Connection Error:', error);
        });
        this.client.subscribe('newexercise', { qos: 2 }, (error) => {
            if (error) {
                console.error('Subscribe newexercise error:', error);
            } else {
                console.log(`Subscribed to newexercise topic`);
            }
        })
        
    }

    publishNewPlan2Patient(patient_user_id:number) {
        const topic = 'plans';
        const message =  `Patient user_id ${patient_user_id} has a new plan to work on`
        this.client.publish(topic, message, { qos: 2 }, (error) => {
            if (error) {
                console.error('Publish error:', error);
            } else {
                console.log(`Message published to patient/: ${patient_user_id}`);
            }
        });
    }

    publishNewExercise(exercise_id:number) {
        const topic = 'newExercise/success';
        const message =  `New exercise of id ${exercise_id} has published`
        this.client.publish(topic, message, { qos: 2 }, (error) => {
            if (error) {
                console.error('Publish error:', error);
            } else {
                console.log(`Message published to newExercise/success exercise number: ${exercise_id}`);
            }
        });
    }
   async newExerciseSubscription() {
        const promessa = await new Promise((resolve, reject) => {
            this.client.on('message', (receivedTopic, message) => {
                console.log("Mqtt sub was called")
                if (receivedTopic === "newexercise") {
                    //console.log(`Message received on topic "${receivedTopic}": "${message.toString()}"`);
                    resolve(message.toString())
                }
              })
        })
        return promessa
    }
    
}

export default MqttProvider