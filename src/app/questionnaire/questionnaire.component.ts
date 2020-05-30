import {Component, OnInit} from '@angular/core';
import {QuestionnaireService} from '../questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

  constructor(private questionnaireService: QuestionnaireService) {
  }

  ngOnInit(): void {
    console.log('test');
    this.questionnaireService.getCoffeeOrders().subscribe(console.log);
  }

  onSubmit() {
    const data = this.questionnaireService.form.value;
    this.questionnaireService.createCoffeeOrder(data)
      .then(res => {
        console.log(res.toString());
      });
  }
}
