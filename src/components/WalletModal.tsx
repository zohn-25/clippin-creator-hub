import { useState } from 'react';
import { X, TrendingUp, IndianRupee, Clock, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { mockWalletData } from '@/data/mockData';
import type { UserRole } from '@/hooks/useRole';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
}

export const WalletModal = ({ isOpen, onClose, role }: WalletModalProps) => {
  const [addFundsAmount, setAddFundsAmount] = useState('');
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleWithdraw = () => {
    toast({
      title: "Withdraw Request Sent!",
      description: "Your withdrawal request is being processed.",
    });
    onClose();
  };

  const handleAddFunds = () => {
    if (addFundsAmount && parseFloat(addFundsAmount) > 0) {
      toast({
        title: "Funds Added Successfully!",
        description: `₹${addFundsAmount} has been added to your wallet.`,
      });
      setAddFundsAmount('');
      onClose();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="glass-card w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-orbitron font-bold gradient-text">
              {role === 'creator' ? 'Creator Wallet' : 
               role === 'brand' ? 'Brand Wallet' :
               role === 'big-creator' ? 'Big Creator Wallet' : 'Editor Wallet'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-foreground/60 hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {(role === 'creator' || role === 'editor' || role === 'big-creator') ? (
            <>
              {/* Creator/Editor/Big Creator Wallet Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="glass-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Earnings</p>
                      <p className="text-2xl font-bold text-success">
                        {formatCurrency(mockWalletData.creator.earnings)}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-success" />
                  </div>
                </div>

                <div className="glass-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Withdrawable</p>
                      <p className="text-2xl font-bold text-primary">
                        {formatCurrency(mockWalletData.creator.withdrawable)}
                      </p>
                    </div>
                    <IndianRupee className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <div className="glass-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold text-yellow-400">
                        {formatCurrency(mockWalletData.creator.pending)}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Add Funds for Big Creator */}
              {role === 'big-creator' && (
                <div className="mb-6">
                  <h3 className="text-lg font-orbitron font-semibold mb-3">Add Funds</h3>
                  <div className="flex gap-3">
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={addFundsAmount}
                      onChange={(e) => setAddFundsAmount(e.target.value)}
                      className="flex-1 bg-input/50 border-white/20"
                    />
                    <Button 
                      onClick={handleAddFunds}
                      className="glow-button bg-gradient-primary"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Funds
                    </Button>
                  </div>
                </div>
              )}

              {/* Withdraw Button */}
              <div className="mb-6">
                <Button 
                  onClick={handleWithdraw}
                  className="glow-button bg-gradient-primary w-full md:w-auto"
                >
                  Withdraw Available Funds
                </Button>
              </div>

              {/* Recent Payouts */}
              <div>
                <h3 className="text-lg font-orbitron font-semibold mb-4">Recent Payouts</h3>
                <div className="space-y-3">
                  {mockWalletData.creator.recentPayouts.map((payout) => (
                    <div key={payout.id} className="flex items-center justify-between p-3 glass-card">
                      <div>
                        <p className="font-medium">{payout.campaign}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(payout.date)}</p>
                      </div>
                      <p className="font-bold text-success">
                        +{formatCurrency(payout.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Brand Wallet Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="glass-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Available Balance</p>
                      <p className="text-2xl font-bold text-success">
                        {formatCurrency(mockWalletData.brand.availableBalance)}
                      </p>
                    </div>
                    <IndianRupee className="h-8 w-8 text-success" />
                  </div>
                </div>

                <div className="glass-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-bold text-destructive">
                        {formatCurrency(mockWalletData.brand.spent)}
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-destructive" />
                  </div>
                </div>

                <div className="glass-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Reserved</p>
                      <p className="text-2xl font-bold text-yellow-400">
                        {formatCurrency(mockWalletData.brand.reserved)}
                      </p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-400" />
                  </div>
                </div>
              </div>

              {/* Add Funds */}
              <div className="mb-6">
                <h3 className="text-lg font-orbitron font-semibold mb-3">Add Funds</h3>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={addFundsAmount}
                    onChange={(e) => setAddFundsAmount(e.target.value)}
                    className="flex-1 bg-input/50 border-white/20"
                  />
                  <Button 
                    onClick={handleAddFunds}
                    className="glow-button bg-gradient-primary"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Funds
                  </Button>
                </div>
              </div>

              {/* Transaction History */}
              <div>
                <h3 className="text-lg font-orbitron font-semibold mb-4">Transaction History</h3>
                <div className="space-y-3">
                  {mockWalletData.brand.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 glass-card">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
                      </div>
                      <p className={`font-bold ${
                        transaction.type === 'added' ? 'text-success' : 'text-destructive'
                      }`}>
                        {transaction.type === 'added' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};