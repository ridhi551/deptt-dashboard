
import { TCMap, TimeTable } from '../components/tt/Generator'

import MatrixDisplay from '../components/tt/MatrixDisplay';

export default function GeneratorTimeTable() {
    const teacherMap = new Map();
    
    teacherMap.set(101, "Jyoti Sir");
    teacherMap.set(102, "Bhawna Mam");
    teacherMap.set(103, "Sheetal Mam");
    teacherMap.set(107, "Akhil Sir");
    teacherMap.set(109, "Heera Sir");
    teacherMap.set(110, "Neeraj Sir");
    teacherMap.set(111, "Simmi Mam");
    
    const s4 = [new TCMap(101), new TCMap(102), new TCMap(103), new TCMap(107), new TCMap(109), new TCMap(110)];
    const s6 = [new TCMap(111), new TCMap(107), new TCMap(103), new TCMap(102), new TCMap(101)];
    

    const object = new TimeTable();

    const { fourthSem, sixthSem } = object.create(s4, s6, teacherMap); // here a call is made

return (
    <div className='text-center'>
        <MatrixDisplay matrix1={fourthSem} matrix2={sixthSem}/>
        <br />
    </div>
  )
}