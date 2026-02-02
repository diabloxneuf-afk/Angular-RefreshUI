import { Routes } from '@angular/router';
import { Exemple1 } from './exemple1/exemple1/exemple1';
import { Exemple3 } from './exemple3/exemple3/exemple3';
import { Exemple4 } from './exemple4/exemple4/exemple4';
import { Exemple2 } from './exemple2/exemple2/exemple2';
import { Exemple6 } from './exemple6/exemple6/exemple6';
import { Exemple5 } from './exemple5/exemple5/exemple5';
import { Exemple7 } from './exemple7/exemple7/exemple7';

export const routes: Routes = [
    {'path': '', component: Exemple1},
    { 'path': 'exemple1', component: Exemple1 },
    { 'path': 'exemple2', component: Exemple2  },
    { 'path': 'exemple3', component: Exemple3 },
    { 'path': 'exemple4', component: Exemple4 },
    { 'path': 'exemple5', component: Exemple5 },
    { 'path': 'exemple6', component: Exemple6},
    { 'path': 'exemple7', component: Exemple7},
    { 'path': '**', redirectTo: '' }
];
