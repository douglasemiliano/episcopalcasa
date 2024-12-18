import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  // Transição para a direita (home => lecionario)
  transition('home => lecionario', [
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(100%)' }), // Entra pela direita
          animate('300ms ease-out', style({ transform: 'translateX(0)' })) // Para na posição final
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0)' }), // Começa na posição inicial
          animate('300ms ease-out', style({ transform: 'translateX(-100%)' })) // Sai para a esquerda
        ],
        { optional: true }
      )
    ])
  ]),

  // Transição para a esquerda (lecionario => home)
  transition('lecionario => home', [
    query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateX(-100%)' }), // Entra pela esquerda
          animate('300ms ease-out', style({ transform: 'translateX(0)' })) // Para na posição final
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0)' }), // Começa na posição inicial
          animate('300ms ease-out', style({ transform: 'translateX(100%)' })) // Sai para a direita
        ],
        { optional: true }
      )
    ])
  ])
]);
