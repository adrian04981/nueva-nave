import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  
  currentYear = new Date().getFullYear();

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
      'https://picsum.photos/id/119/800/600',
      'https://picsum.photos/id/175/800/600',
      'https://picsum.photos/id/211/800/600',
      'https://picsum.photos/id/305/800/600'
    ]
  });

  mainCarImage = signal<string>(this.car().images[0]);

  changeMainCarImage(newImage: string): void {
    this.mainCarImage.set(newImage);
  }
}