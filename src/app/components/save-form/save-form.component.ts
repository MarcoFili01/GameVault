import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-save-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.css']
})
export class SaveFormComponent {
  constructor(private fb: FormBuilder, private gameService: GameService, private router: Router) {}

  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    platform: ['', Validators.required],
    genre: [''],
    tips: this.fb.array<string>([]),
    saves: this.fb.array<FormGroup>([])
  });

  get tips(): FormArray {
    return this.form.get('tips') as FormArray;
  }
  get saves(): FormArray<FormGroup> {
    return this.form.get('saves') as FormArray<FormGroup>;
  }

  addTip() {
    this.tips.push(this.fb.control('', [Validators.required, Validators.minLength(2)]));
  }
  removeTip(i: number) {
    this.tips.removeAt(i);
  }

  addSave() {
    this.saves.push(
      this.fb.group({
        name: ['', Validators.required],
        note: ['']
      })
    );
  }
  removeSave(i: number) {
    this.saves.removeAt(i);
  }

  cancel() {
    this.form.reset();
    this.router.navigateByUrl('/');
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      title: this.form.value.title!,
      platform: this.form.value.platform!,
      genre: this.form.value.genre || undefined,
      tips: (this.form.value.tips || []).filter((t): t is string => !!t),
      saves: this.saves.controls.map(ctrl => {
        const val = ctrl.value as { name: string; note?: string };
        return {
          name: val.name || '',
          note: val.note || ''
        };
      })
    };

    this.gameService.addGame(payload).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => console.error(err)
    });
  }
}
