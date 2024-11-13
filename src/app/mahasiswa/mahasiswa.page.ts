// mahasiswa.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.page.html',
  styleUrls: ['./mahasiswa.page.scss'],
})
export class MahasiswaPage implements OnInit {
  dataMahasiswa: any;
  modalTambah: boolean = false;
  modalEdit: boolean = false;
  id: any;
  nama: any;
  jurusan: any;

  constructor(private api: ApiService, private alertCtrl: AlertController, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getMahasiswa();
  }

  async showConfirmAlert(id: any) {
    const alert = await this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you want to delete this data?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.hapusMahasiswa(id);
          },
        },
      ],
    });
    await alert.present();
  }

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  openModalEdit(isOpen: boolean, idget: any) {
    this.modalEdit = isOpen;
    this.id = idget;
    this.ambilMahasiswa(this.id);
    this.modalTambah = false;
  }

  resetModal() {
    this.id = null;
    this.nama = '';
    this.jurusan = '';
  }

  openModalTambah(isOpen: boolean) {
    this.modalTambah = isOpen;
    this.resetModal();
    this.modalEdit = false;
  }

  cancel() {
    this.modalTambah = false;
    this.modalEdit = false;
    this.resetModal();
  }

  getMahasiswa() {
    this.api.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataMahasiswa = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  tambahMahasiswa() {
    if (this.nama && this.jurusan) {
      let data = {
        nama: this.nama,
        jurusan: this.jurusan,
      };
      this.api.tambah(data, 'tambah.php').subscribe({
        next: () => {
          this.resetModal();
          this.getMahasiswa();
          this.modalTambah = false;
          this.showAlert('Data successfully added.');
        },
        error: () => {
          console.log('Failed to add data');
        },
      });
    } else {
      console.log('Failed to add data because some fields are empty');
    }
  }

  hapusMahasiswa(id: any) {
    this.api.hapus(id, 'hapus.php?id=').subscribe({
      next: () => {
        this.getMahasiswa();
        this.showAlert('Data successfully deleted.');
      },
      error: () => {
        console.log('Failed to delete data');
      },
    });
  }

  ambilMahasiswa(id: any) {
    this.api.lihat(id, 'lihat.php?id=').subscribe({
      next: (hasil: any) => {
        let mahasiswa = hasil;
        this.id = mahasiswa.id;
        this.nama = mahasiswa.nama;
        this.jurusan = mahasiswa.jurusan;
      },
      error: () => {
        console.log('Failed to fetch data');
      },
    });
  }

  editMahasiswa() {
    let data = {
      id: this.id,
      nama: this.nama,
      jurusan: this.jurusan,
    };
    this.api.edit(data, 'edit.php').subscribe({
      next: () => {
        this.resetModal();
        this.getMahasiswa();
        this.modalEdit = false;
        this.showAlert('Data successfully edited.');
      },
      error: () => {
        console.log('Failed to edit data');
      },
    });
  }
}
