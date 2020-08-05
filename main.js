/* Стоимость */
const totalCost = document.getElementById('total-cost');
const totalCostRange = document.getElementById('total-cost-range');

/* Первоначальный взнос */
const anInitialFee = document.getElementById('an-initial-fee');
const anInitialFeeRange = document.getElementById('an-initial-fee-range');

/* Срок кредита */
const creditTerm = document.getElementById('credit-term');
const creditTermRange = document.getElementById('credit-term-range');

/* Вывод итоговых значений */
const totalAmountOfCredit = document.getElementById('amount-of-credit');
const totalMonthlyPayment = document.getElementById('monthly-payment');
const recommendedIncome = document.getElementById('recommended-income');

/* Все range */
const inputsRange = document.querySelectorAll('.input-range');

/* Все банки */
const bankBtns = document.querySelectorAll('.bank');

const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
};

assignValue();

const banks = [
    {
        name: 'alfa',
        percent: 8.7
    },
    {
        name: 'sberbank',
        percent: 8.4
    },
    {
        name: 'pochta',
        percent: 7.9
    },
    {
        name: 'tinkoff',
        percent: 9.2
    },
];

/* По умолчанию выбран первый банк */
let currentPrecent = banks[0].percent;

for(let bank of bankBtns) {
    bank.addEventListener('click', () => {
        for(let item of bankBtns) {
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank);
    });
};

const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    const currentBank = banks.find(bank => bank.name === dataAttrValue);

    currentPrecent = currentBank.percent;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value)
};

for(let input of inputsRange) {
    input.addEventListener('input', () => {
        assignValue();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    });
};

const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {
    /*
        ЕП - ежемесячныплатёж
        РК - размер кредита
        ПС - процентная ставка
        КМ - количество месяцев

        ЕП = (РК + ((( РК / 100) * ПС) *КМ) / КМ;
    */

    let monthlyPayment; // Ежемесячны платёж
    let lountAmount = totalCost - anInitialFee; // Размер кредита
    let interestRate = currentPrecent; // Процентная ставка
    let amountOfYears = creditTerm; //Количество лет
    let amountOfMoths = 12 * amountOfYears; // Количество месяцев

    monthlyPayment = (lountAmount + (((lountAmount / 100) * interestRate) / 12) * amountOfMoths) / amountOfMoths;
    
    const monthlyPaymentArounded = Math.round(monthlyPayment);

    if(monthlyPaymentArounded < 0) {
        return false;
    } else {
        totalAmountOfCredit.innerHTML = `${lountAmount} ₽`;
        totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} ₽`;
        recommendedIncome.innerHTML = `${monthlyPaymentArounded + monthlyPaymentArounded * 0.35} ₽`;
    }
};
