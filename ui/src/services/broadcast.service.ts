import Config from '@/config';
import axios from 'axios';
import { BroadcastMessageType, IQuickReply } from '../types/broadcast.interface';

export default class BroadcastService {
  /*
    Broadcast a message.
    @params {string} url - Url to send the message to.
    @params {string} token
    @params {string} text - Text to broadcast.
    @return {Promise}
  */
  private async broadcast(
    url: string,
    token: string,
    type: BroadcastMessageType,
    text: string,
    payload: IQuickReply
  ) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const data = { payload, text, type };
    try {
      return await axios({
        url,
        method: 'POST',
        headers,
        data,
      });
    } catch (e) {
      throw e;
    }
  }

  /*
    Broadcast a message to all the doers.
    @params {string} token
    @params {string} text - Text to broadcast.
    @return {Promise}
  */
  public async broadcastToAllDoers(
    token: string,
    type: BroadcastMessageType,
    text: string,
    payload?: IQuickReply
  ) {
    const url = `${Config.API_ENDPOINT_BROADCAST}`;
    this.broadcast(url, token, type, text, payload);
  }

  /*
    Broadcast a message to the hired doers of a mission.
    @params {string} token
    @params {string} missionId - Id of the mission.
    @params {string} text - Text to broadcast.
    @return {Promise}
  */
  public async broadcastToHiredDoers(
    token: string,
    missionId: string,
    type: BroadcastMessageType,
    text: string,
    payload?: IQuickReply
  ) {
    const url = `${Config.API_ENDPOINT_BROADCAST}mission/${missionId}/hired`;
    this.broadcast(url, token, type, text, payload);
  }
}
