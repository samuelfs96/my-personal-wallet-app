import { Card } from './components/common';
import { WalletIcon, ChartBarIcon, PlusCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-5">
            <Card title="Balance" icon={<WalletIcon className="w-5 h-5" />}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            </Card>
            <Card title="Statistics" icon={<ChartBarIcon className="w-5 h-5" />}>
              <p>Soon...</p>
            </Card>
          </div>
          <div className="flex-2 flex flex-col gap-5">
            <div className="grid grid-cols-3 gap-5">
              <Card
                title="New Transaction"
                className="col-span-2"
                icon={<PlusCircleIcon className="w-5 h-5" />}
              >
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
              </Card>
              <Card className="col-span-1">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
              </Card>
            </div>
            <Card title="Latest Transactions" icon={<ClockIcon className="w-5 h-5" />}>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
