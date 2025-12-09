import { Component, ChangeDetectionStrategy, signal, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

declare var AOS: any; // Declare AOS to be available globally

interface Service {
  name: string;
  duration: string;
  price: number;
  features: string[];
  isPremium: boolean;
}

interface FeaturedCar {
  name: string;
  version: string;
  year: number;
  mileage: string;
  engine: string;
  transmission: string;
  traction: string;
  price: string;
  upgrades: string[];
  description: string;
  images: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule]
})
export class AppComponent implements AfterViewInit {
  
  currentYear = new Date().getFullYear();
  whatsAppPhoneNumber = '51966401791'; // Peru country code

  instagramUrl = 'https://www.instagram.com/nuevanave?igsh=MXgydW5rMmJmaXgwaw==';
  tiktokUrl = 'https://www.tiktok.com/@nueva.nave?_t=ZM-8tBqXMoq8es&_r=1';
  email = 'NUEVANAVEPERU@GMAIL.COM';

  sellCarForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    carInfo: new FormControl('', Validators.required),
  });

  services = signal<Service[]>([
    {
      name: 'Brillo One',
      duration: '1 Año',
      price: 750,
      features: [
        'Descontaminación de pintura y faros',
        'Pulido y abrillantado general',
        'Limpieza profunda de lunas',
        'Recubrimiento cerámico (1 año)',
        'Aplicación de silicona en llantas',
        'Ambientador de cortesía'
      ],
      isPremium: false
    },
    {
      name: 'Escudo Plus',
      duration: '2 Años',
      price: 950,
      features: [
        'Todo lo de Brillo One',
        'Pulido detallado en cromos',
        'Recubrimiento extendido (2 años)',
        'Aplicación en molduras y vidrios',
        'Restaurador de plásticos (Meguiar’s)',
        'Ambientador premium'
      ],
      isPremium: true
    },
    {
      name: 'Nueva Nave',
      duration: '3 Años',
      price: 1150,
      features: [
        'Todo lo de Escudo Plus',
        'Recubrimiento cerámico completo (3 años)',
        'Aplicación en plásticos y detalles',
        'Limpieza e hidratación de cueros (Meguiar’s)',
        'Limpieza e hidratación del timón',
        'Ambientador premium'
      ],
      isPremium: false
    }
  ]);

  car = signal<FeaturedCar>({
    name: 'BMW 318i',
    version: '318i',
    year: 2017,
    mileage: '44,000 km',
    engine: '1.5L TwinPower Turbo',
    transmission: 'Automática de 8 velocidades',
    traction: 'RWD – Propulsión trasera',
    price: '$17,500 (negociable)',
    upgrades: [
      'Mantenimientos en McLaren Service',
      'Batería original BMW nueva',
      'Se entregan las 2 llaves originales',
      'Interior en cuero impecable',
      'Interfaz multimedia 100% OEM',
      'Cola de pato',
      'Stickers M Performance'
    ],
    description: 'Un sedán premium equilibrado, elegante y confiable. Excelente manejo, consumo eficiente y estética deportiva con detalles M. Unidad muy cuidada, lista para disfrutar.',
    images: [
      'assets/Imagen de WhatsApp 2025-11-30 a las 10.00.01.jpeg',
      'assets/Imagen de WhatsApp 2025-11-30 a las 10.00.02.jpeg',
      'assets/Imagen de WhatsApp 2025-11-30 a las 10.00.03.jpeg',
      'assets/Imagen de WhatsApp 2025-11-30 a las 10.00.04.jpeg'
    ]
  });

  mainCarImage = signal<string>(this.car().images[0]);

  ngAfterViewInit(): void {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }

  changeMainCarImage(newImage: string): void {
    this.mainCarImage.set(newImage);
  }

  getCarWhatsAppUrl(): string {
    const carName = this.car().name;
    const message = `Hola, estoy interesado en el ${carName}.`;
    return `https://wa.me/${this.whatsAppPhoneNumber}?text=${encodeURIComponent(message)}`;
  }
  
  getServiceWhatsAppUrl(serviceName: string): string {
    const message = `Hola, quisiera agendar el servicio de tratamiento cerámico "${serviceName}".`;
    return `https://wa.me/${this.whatsAppPhoneNumber}?text=${encodeURIComponent(message)}`;
  }

  onSubmitSellForm(): void {
    if (this.sellCarForm.invalid) {
      this.sellCarForm.markAllAsTouched();
      return;
    }
    const formValue = this.sellCarForm.value;
    const message = `Hola, quiero vender mi auto.\n\n*Nombre:* ${formValue.name}\n*Teléfono:* ${formValue.phone}\n*Auto:* ${formValue.carInfo}`;
    const url = `https://wa.me/${this.whatsAppPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}