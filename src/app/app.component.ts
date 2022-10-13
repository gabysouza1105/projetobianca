import { Component } from '@angular/core';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'formatarDados_Bianca';
  data!: [][];

  onFileChange(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    const reader: FileReader = new FileReader();

    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsName: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsName];
      this.data = (XLSX.utils.sheet_to_json(ws, { raw: false, header: 1, dateNF: 'yyyy"-"MM"-"dd" "h":"M' }));

      const data = this.data.slice(1);

      const dataGroupedByCpf = this.groupBy(data, 0);

      const dataGroupedByCpfAndDate = Object.values(dataGroupedByCpf).map((element: any) => {
        return this.groupBy(element, 1);
      })

      const ready = dataGroupedByCpfAndDate.map((element: any) => {
        return Object.values(element).map((element2: any) => {
          const element2_ = element2.map((element3: any) => {
            return [
              element3[0] != undefined ? `"${element3[0]}"        ` : '""',
              element3[1] != undefined ? `"${element3[1]}"` : '""',
              element3[2] != undefined ? `"${element3[2]}"  ` : '""',
              element3[3] != undefined ? `"${element3[3]}"               ` : '""',
              element3[4] != undefined ? `"${element3[4]}" ` : '""',
              element3[5] != undefined ? `"${element3[5]}"` : '""',
              element3[6] != undefined ? `"${element3[6]}" ` : '""',
              element3[7] != undefined ? `"${element3[7]}"` : '""',
              element3[8] != undefined ? `"${element3[8]}"` : '""',
              element3[9] != undefined ? `"${element3[9]}"      ` : '""',
              element3[10] != undefined ? `"${element3[10]}"` : '""',
              element3[11] != undefined ? `"${element3[11]}"            ` : '""',
              element3[13] != undefined ? `${element3[13]}${element3[14]};${element3[15]}` : '""',
              element3[16] != undefined ? `"${element3[16]}"` : '""',
              element3[17] != undefined ? `"${element3[17]}"               ` : '""',
              element3[18] != undefined ? `  "${element3[18]}" ` : '""',
              element3[19] != undefined ? `"${element3[19]}"` : '""',
              element3[20] != undefined ? `"${element3[20]}"` : '',
              element3[21] != undefined ? `"${element3[21]}"           ` : '',
              element3[22] != undefined ? `"${element3[22]}"  ` : '',
              element3[23] != undefined ? `"${element3[23]}"` : '                ',
              element3[24] != undefined ? `"${element3[24]}"` : '          ',
              element3[25] != undefined ? `"${element3[25]}"` : '   ',
              element3[26] != undefined ? `"${element3[26]}"` : '          ',
              element3[27] != undefined ? `"${element3[27]}"` : '          ',
              element3[28] != undefined ? `"${element3[28]}"` : '       ',
              element3[29] != undefined ? `"${element3[29]}"` : '        ',
              element3[30] != undefined ? `"${element3[30]}"` : '      ',
              element3[31] != undefined ? `"${element3[31]}"` : '         ',
              element3[32] != undefined ? `"${element3[32]}"` : '        ',
              element3[33] != undefined ? `"${element3[33]}"` : '',
            ]
          });
          const result2 = element2_.reduce((inc: any, element3: any) => {
            return [
              element3[0],
              element3[1],
              element3[2],
              element3[3],
              element3[4],
              element3[5],
              element3[6],
              element3[7],
              element3[8],
              element3[9],
              element3[10],
              element3[11],
              `${element3[12]}@${inc[12]}`,
              element3[13],
              element3[14],
              element3[15],
              element3[16],
              element3[17],
              element3[18],
              element3[19],
              element3[20],
              element3[21],
              element3[22],
              element3[23],
              element3[24],
              element3[25],
              element3[26],
              element3[27],
              element3[28],
              element3[29],
              element3[30],
            ]
          })

          const final = result2.map((element3: any, index: any) => {
            if (index == 12) {
              return `"${element3}" `
            } else {
              return element3
            }
          })

          return final;
        })
      })

      const header = "individualRegistration    | consultationDate    | minutes | consultationType   | doctorName     | crm     | state | motivation       | clinicalDate | indicator | result   | resultIndicator | exams                                                                        | scheduleDate | consultationNature | nature |  cancelDate  | emissionDate | recommendation | plataform | civilMaintenance | explosives | height | excavation | electricity| welding | confined | cold   | radiation | pressure | loadHandling";

      const result = ready.flat().map((element: any) => {
        return element.join(' | ')
      })

      result.unshift(header);
      this.saveFile(result.join("\n"))

    }
  }

  saveFile(text: string) {
    const blob =
      new Blob([
        text],
        { type: "text/plain;charset=utf-8" });
    saveAs(blob, "save-me.csv");
  }

  groupBy = (array: any, key: any) => {
    // Return the end result
    return array.reduce((result: any, currentValue: any) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };



}
