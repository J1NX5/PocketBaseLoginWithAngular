import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Observable, Subscriber, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PocketBaseService {

  private pb: PocketBase = new PocketBase('https://infra-pb-01.opreturn.de');
  token$ = new BehaviorSubject<any>(this.pb.authStore.token)

  constructor() {
    console.log('auth token',this.pb.authStore.token)
    this.pb.authStore.onChange((token: string) => {
      console.log('auth token changed', token)
      this.token$.next(token)
    })
  }

  // Beispiel-Methode zum Anmelden eines Benutzers
  async login(email: string, password: string) {
    try {
      const authData = await this.pb.collection('users').authWithPassword(email, password);
      console.log('Login successful', authData);
      return authData;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  }

  logout() {
    this.pb.authStore.clear()
  }


  watch<T>(collection: string, id: string) {
    console.log('watch', collection, id)
    return new Observable((observer: Subscriber<T>) => {
      this.pb.collection(collection).getOne(id).then((data: any) => {
        console.log('initial data received', data)
        observer.next(data);
      })
      console.log('watch', collection, id, 'new observable created')
      this.pb.collection(collection).subscribe(id, (data: any) => {
        console.log('new data received', data)
        observer.next(data.record);
      });

      return () => {
        console.log('unsubscribe', collection, id)
        this.pb.collection(collection).unsubscribe(id);
      }

    })
  }

  async incrementCounter(collectionName: string, id: string) {
    try {
      const data: any = await this.pb.collection(collectionName).getOne(id);
      data.counter = parseInt(data.counter) + 1;
      await this.pb.collection(collectionName).update(id, data);
    } catch (error) {
      console.error('Updating record failed', error);
      throw error;
    }
  }

  async hello (name: string) {
    return await this.pb.send(`/hello/${name}`,{})
  }

  async create(collectionName: string, data: FormData) {
    try {
      const result = await this.pb.collection(collectionName).create(data)
      console.log(`created record ${result.id} in collection ${collectionName} to ${JSON.stringify(result)}`)
      return result
    } catch (error) {
      console.error('Updating record failed', error);
      throw error;
    }
  }

  async update(collectionName: string, objectId: string, data: FormData) {
    try {
      const result = await this.pb.collection(collectionName).update(objectId, data)
      console.log(`updated record ${objectId} in collection ${collectionName} to ${JSON.stringify(data)}`)
      return result
    } catch (error) {
      console.error('Updating record failed', error);
      throw error;
    }
  }

  // Beispiel-Methode zum Abrufen von Datensätzen
  async getRecords(collectionName: string) {
    try {
      const records = await this.pb.collection(collectionName).getFullList();
      return records;
    } catch (error) {
      console.error('Fetching records failed', error);
      throw error;
    }
  }
}
