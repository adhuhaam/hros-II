import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { 
  Search, 
  RefreshCw,
  Download,
  DollarSign,
  Loader2,
  ArrowUpDown,
  SortAsc,
  SortDesc,
  Eye,
  CreditCard,
  Receipt,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  UserCheck,
  Building2,
  Calendar,
  FileText,
  Banknote,
  TrendingUp,
  TrendingDown,
  Wallet,
  Target,
  BarChart3,
  PieChart,
  Filter,
  Plus,
  Minus,
  Edit3,
  Trash2,
  Send,
  Phone,
  Mail,
  MapPin,
  Globe,
  Shield,
  Award,
  Star,
  Flag,
  Home,
  Settings,
  MoreHorizontal
} from 'lucide-react'
import { toast } from 'sonner@2.0.3'

interface Payment {
  id: string
  candidateId: string
  candidateName: string
  email: string
  phone: string
  nationality: string
  position: string
  depositAmount: number
  paidAmount: number
  remainingAmount: number
  paymentStatus: 'pending' | 'partial' | 'completed' | 'overdue' | 'refunded'
  paymentMethod: 'bank-transfer' | 'cash' | 'card' | 'cheque'
  transactionRef?: string
  dueDate: string
  paidDate?: string
  collectedBy?: string
  avatar?: string
  notes?: string
  paymentHistory: PaymentRecord[]
  createdAt: string
  updatedAt: string
}

interface PaymentRecord {
  id: string
  amount: number
  method: string
  transactionRef?: string
  date: string
  collectedBy: string
  notes?: string
}

interface PaymentForm {
  amount: string
  method: string
  transactionRef: string
  notes: string
}

type SortField = 'candidateName' | 'nationality' | 'depositAmount' | 'paidAmount' | 'dueDate' | 'paymentStatus'
type SortDirection = 'asc' | 'desc'

// Fixed deposit rates by nationality
const DEPOSIT_RATES = {
  'Bangladeshi': 15000,
  'Indian': 18000,
  'Pakistani': 16000,
  'Sri Lankan': 20000,
  'Nepalese': 14000,
  'Filipino': 22000,
  'Indonesian': 17000,
  'Vietnamese': 19000,
  'Thai': 21000,
  'Other': 18000
}

// Comprehensive dummy data for work permit deposits
const mockPayments: Payment[] = [
  {
    id: '1',
    candidateId: 'CAND001',
    candidateName: 'Mohammad Rahman',
    email: 'mohammad.rahman@email.com',
    phone: '+880 171 234567',
    nationality: 'Bangladeshi',
    position: 'Construction Worker',
    depositAmount: 15000,
    paidAmount: 15000,
    remainingAmount: 0,
    paymentStatus: 'completed',
    paymentMethod: 'bank-transfer',
    transactionRef: 'BT2024001',
    dueDate: '2024-01-15',
    paidDate: '2024-01-10',
    collectedBy: 'Ahmed Hassan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    notes: 'Payment completed via bank transfer. Documentation verified.',
    paymentHistory: [
      {
        id: 'PAY001',
        amount: 15000,
        method: 'bank-transfer',
        transactionRef: 'BT2024001',
        date: '2024-01-10',
        collectedBy: 'Ahmed Hassan',
        notes: 'Full payment received'
      }
    ],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-10'
  },
  {
    id: '2',
    candidateId: 'CAND002',
    candidateName: 'Raj Kumar Patel',
    email: 'raj.patel@email.com',
    phone: '+91 98765 43210',
    nationality: 'Indian',
    position: 'Site Engineer',
    depositAmount: 18000,
    paidAmount: 10000,
    remainingAmount: 8000,
    paymentStatus: 'partial',
    paymentMethod: 'cash',
    transactionRef: 'CSH2024002',
    dueDate: '2024-02-01',
    paidDate: '2024-01-20',
    collectedBy: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    notes: 'Partial payment received. Balance to be paid before visa processing.',
    paymentHistory: [
      {
        id: 'PAY002',
        amount: 10000,
        method: 'cash',
        transactionRef: 'CSH2024002',
        date: '2024-01-20',
        collectedBy: 'Sarah Johnson',
        notes: 'First installment payment'
      }
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: '3',
    candidateId: 'CAND003',
    candidateName: 'Ali Hassan Khan',
    email: 'ali.khan@email.com',
    phone: '+92 300 1234567',
    nationality: 'Pakistani',
    position: 'Electrician',
    depositAmount: 16000,
    paidAmount: 0,
    remainingAmount: 16000,
    paymentStatus: 'pending',
    paymentMethod: 'bank-transfer',
    dueDate: '2024-01-30',
    collectedBy: 'Kumar Patel',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    notes: 'Candidate contacted. Payment expected this week.',
    paymentHistory: [],
    createdAt: '2024-01-25',
    updatedAt: '2024-01-25'
  },
  {
    id: '4',
    candidateId: 'CAND004',
    candidateName: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+94 77 123 4567',
    nationality: 'Sri Lankan',
    position: 'HR Assistant',
    depositAmount: 20000,
    paidAmount: 20000,
    remainingAmount: 0,
    paymentStatus: 'completed',
    paymentMethod: 'card',
    transactionRef: 'CD2024003',
    dueDate: '2024-01-20',
    paidDate: '2024-01-18',
    collectedBy: 'Aisha Mohamed',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=150&h=150&fit=crop&crop=face',
    notes: 'Payment completed via credit card. Quick processing requested.',
    paymentHistory: [
      {
        id: 'PAY003',
        amount: 20000,
        method: 'card',
        transactionRef: 'CD2024003',
        date: '2024-01-18',
        collectedBy: 'Aisha Mohamed',
        notes: 'Credit card payment processed successfully'
      }
    ],
    createdAt: '2024-01-12',
    updatedAt: '2024-01-18'
  },
  {
    id: '5',
    candidateId: 'CAND005',
    candidateName: 'Ram Bahadur Thapa',
    email: 'ram.thapa@email.com',
    phone: '+977 98 1234 5678',
    nationality: 'Nepalese',
    position: 'Security Guard',
    depositAmount: 14000,
    paidAmount: 5000,
    remainingAmount: 9000,
    paymentStatus: 'partial',
    paymentMethod: 'cash',
    transactionRef: 'CSH2024004',
    dueDate: '2024-02-05',
    paidDate: '2024-01-28',
    collectedBy: 'Ali Nasheed',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    notes: 'First installment received. Next payment scheduled for next week.',
    paymentHistory: [
      {
        id: 'PAY004',
        amount: 5000,
        method: 'cash',
        transactionRef: 'CSH2024004',
        date: '2024-01-28',
        collectedBy: 'Ali Nasheed',
        notes: 'Partial payment - first installment'
      }
    ],
    createdAt: '2024-01-20',
    updatedAt: '2024-01-28'
  },
  {
    id: '6',
    candidateId: 'CAND006',
    candidateName: 'Jose Maria Santos',
    email: 'jose.santos@email.com',
    phone: '+63 917 123 4567',
    nationality: 'Filipino',
    position: 'Foreman',
    depositAmount: 22000,
    paidAmount: 0,
    remainingAmount: 22000,
    paymentStatus: 'overdue',
    paymentMethod: 'bank-transfer',
    dueDate: '2024-01-10',
    collectedBy: 'Ahmed Hassan',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    notes: 'Payment overdue. Multiple follow-ups made. Candidate requested extension.',
    paymentHistory: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  },
  {
    id: '7',
    candidateId: 'CAND007',
    candidateName: 'Siti Nurhaliza',
    email: 'siti.nurhaliza@email.com',
    phone: '+62 812 3456 7890',
    nationality: 'Indonesian',
    position: 'Housekeeping Supervisor',
    depositAmount: 17000,
    paidAmount: 17000,
    remainingAmount: 0,
    paymentStatus: 'completed',
    paymentMethod: 'cheque',
    transactionRef: 'CHQ2024001',
    dueDate: '2024-01-25',
    paidDate: '2024-01-22',
    collectedBy: 'Fatima Al-Rashid',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    notes: 'Payment completed via company cheque. All documentation in order.',
    paymentHistory: [
      {
        id: 'PAY005',
        amount: 17000,
        method: 'cheque',
        transactionRef: 'CHQ2024001',
        date: '2024-01-22',
        collectedBy: 'Fatima Al-Rashid',
        notes: 'Cheque payment cleared successfully'
      }
    ],
    createdAt: '2024-01-18',
    updatedAt: '2024-01-22'
  },
  {
    id: '8',
    candidateId: 'CAND008',
    candidateName: 'Nguyen Van Duc',
    email: 'nguyen.duc@email.com',
    phone: '+84 90 123 4567',
    nationality: 'Vietnamese',
    position: 'Welder',
    depositAmount: 19000,
    paidAmount: 12000,
    remainingAmount: 7000,
    paymentStatus: 'partial',
    paymentMethod: 'bank-transfer',
    transactionRef: 'BT2024005',
    dueDate: '2024-02-10',
    paidDate: '2024-02-01',
    collectedBy: 'Chen Wei Li',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    notes: 'Partial payment received. Balance payment in progress.',
    paymentHistory: [
      {
        id: 'PAY006',
        amount: 8000,
        method: 'bank-transfer',
        transactionRef: 'BT2024005',
        date: '2024-02-01',
        collectedBy: 'Chen Wei Li',
        notes: 'First installment via bank transfer'
      },
      {
        id: 'PAY007',
        amount: 4000,
        method: 'cash',
        transactionRef: 'CSH2024006',
        date: '2024-02-03',
        collectedBy: 'Chen Wei Li',
        notes: 'Additional payment in cash'
      }
    ],
    createdAt: '2024-01-30',
    updatedAt: '2024-02-03'
  },
  {
    id: '9',
    candidateId: 'CAND009',
    candidateName: 'Somchai Jaidee',
    email: 'somchai.jaidee@email.com',
    phone: '+66 89 123 4567',
    nationality: 'Thai',
    position: 'Chef',
    depositAmount: 21000,
    paidAmount: 21000,
    remainingAmount: 0,
    paymentStatus: 'completed',
    paymentMethod: 'bank-transfer',
    transactionRef: 'BT2024006',
    dueDate: '2024-02-15',
    paidDate: '2024-02-10',
    collectedBy: 'Kumar Patel',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    notes: 'Early payment received. Express processing requested.',
    paymentHistory: [
      {
        id: 'PAY008',
        amount: 21000,
        method: 'bank-transfer',
        transactionRef: 'BT2024006',
        date: '2024-02-10',
        collectedBy: 'Kumar Patel',
        notes: 'Full payment - early settlement'
      }
    ],
    createdAt: '2024-02-05',
    updatedAt: '2024-02-10'
  },
  {
    id: '10',
    candidateId: 'CAND010',
    candidateName: 'Ahmed Al-Mahmoud',
    email: 'ahmed.mahmoud@email.com',
    phone: '+20 10 1234 5678',
    nationality: 'Other',
    position: 'Mechanical Engineer',
    depositAmount: 18000,
    paidAmount: 0,
    remainingAmount: 18000,
    paymentStatus: 'pending',
    paymentMethod: 'bank-transfer',
    dueDate: '2024-02-20',
    collectedBy: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    notes: 'New candidate. Bank details shared. Payment expected soon.',
    paymentHistory: [],
    createdAt: '2024-02-12',
    updatedAt: '2024-02-12'
  }
]

export function Collection() {
  // Core state
  const [payments, setPayments] = useState<Payment[]>(mockPayments)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  
  // Dialog states
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showRefundDialog, setShowRefundDialog] = useState(false)
  
  // UI states
  const [searchQuery, setSearchQuery] = useState('')
  const [nationalityFilter, setNationalityFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('dueDate')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    amount: '',
    method: 'bank-transfer',
    transactionRef: '',
    notes: ''
  })

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalCandidates = payments.length
    const totalDepositAmount = payments.reduce((sum, p) => sum + p.depositAmount, 0)
    const totalCollected = payments.reduce((sum, p) => sum + p.paidAmount, 0)
    const totalPending = payments.reduce((sum, p) => sum + p.remainingAmount, 0)
    
    const completedCount = payments.filter(p => p.paymentStatus === 'completed').length
    const pendingCount = payments.filter(p => p.paymentStatus === 'pending').length
    const partialCount = payments.filter(p => p.paymentStatus === 'partial').length
    const overdueCount = payments.filter(p => p.paymentStatus === 'overdue').length
    
    const collectionRate = totalDepositAmount > 0 ? (totalCollected / totalDepositAmount) * 100 : 0
    
    // Payment method breakdown
    const methodBreakdown = payments.reduce((acc, payment) => {
      acc[payment.paymentMethod] = (acc[payment.paymentMethod] || 0) + payment.paidAmount
      return acc
    }, {} as Record<string, number>)
    
    return {
      totalCandidates,
      totalDepositAmount,
      totalCollected,
      totalPending,
      completedCount,
      pendingCount,
      partialCount,
      overdueCount,
      collectionRate,
      methodBreakdown
    }
  }, [payments])

  // Get unique values for filters
  const uniqueNationalities = useMemo(() => {
    const nationalities = [...new Set(payments.map(p => p.nationality))]
    return nationalities.sort()
  }, [payments])

  // Filtering and sorting logic
  const filteredAndSortedPayments = useMemo(() => {
    let filtered = payments.filter(payment => {
      const matchesSearch = payment.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.transactionRef?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          payment.position.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesNationality = nationalityFilter === 'all' || payment.nationality === nationalityFilter
      const matchesStatus = statusFilter === 'all' || payment.paymentStatus === statusFilter
      
      return matchesSearch && matchesNationality && matchesStatus
    })

    // Sort payments
    filtered.sort((a, b) => {
      let aValue: any = a[sortField]
      let bValue: any = b[sortField]

      if (sortField === 'dueDate') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    return filtered
  }, [payments, searchQuery, nationalityFilter, statusFilter, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />
    return sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
  }

  const getStatusColor = (status: Payment['paymentStatus']) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-700 border-green-200'
      case 'partial': return 'bg-yellow-500/10 text-yellow-700 border-yellow-200'
      case 'pending': return 'bg-blue-500/10 text-blue-700 border-blue-200'
      case 'overdue': return 'bg-red-500/10 text-red-700 border-red-200'
      case 'refunded': return 'bg-gray-500/10 text-gray-700 border-gray-200'
      default: return 'bg-gray-500/10 text-gray-600 border-gray-200'
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'bank-transfer': return <Banknote className="h-4 w-4" />
      case 'cash': return <Wallet className="h-4 w-4" />
      case 'card': return <CreditCard className="h-4 w-4" />
      case 'cheque': return <FileText className="h-4 w-4" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

  const handleAddPayment = useCallback(async () => {
    if (!selectedPayment || !paymentForm.amount) {
      toast.error('Please enter a valid payment amount')
      return
    }

    const amount = parseFloat(paymentForm.amount)
    if (amount <= 0 || amount > selectedPayment.remainingAmount) {
      toast.error('Invalid payment amount')
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const newPaymentRecord: PaymentRecord = {
        id: `PAY${Date.now()}`,
        amount,
        method: paymentForm.method,
        transactionRef: paymentForm.transactionRef,
        date: new Date().toISOString().split('T')[0],
        collectedBy: 'Current User',
        notes: paymentForm.notes
      }

      const updatedPayment: Payment = {
        ...selectedPayment,
        paidAmount: selectedPayment.paidAmount + amount,
        remainingAmount: selectedPayment.remainingAmount - amount,
        paymentStatus: selectedPayment.remainingAmount - amount === 0 ? 'completed' : 'partial',
        paymentMethod: paymentForm.method as Payment['paymentMethod'],
        transactionRef: paymentForm.transactionRef || selectedPayment.transactionRef,
        paidDate: new Date().toISOString().split('T')[0],
        collectedBy: 'Current User',
        paymentHistory: [...selectedPayment.paymentHistory, newPaymentRecord],
        updatedAt: new Date().toISOString().split('T')[0]
      }

      setPayments(prev => prev.map(p => p.id === selectedPayment.id ? updatedPayment : p))
      setSelectedPayment(updatedPayment)
      setShowPaymentDialog(false)
      setPaymentForm({
        amount: '',
        method: 'bank-transfer',
        transactionRef: '',
        notes: ''
      })
      
      toast.success(`Payment of MVR ${amount.toLocaleString()} recorded successfully`)

    } catch (error) {
      toast.error('Failed to record payment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [selectedPayment, paymentForm])

  const handleSendReminder = useCallback(async (payment: Payment) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`Payment reminder sent to ${payment.candidateName}`)
    } catch (error) {
      toast.error('Failed to send reminder')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            Work Permit Deposit Collection
          </h1>
          <p className="text-muted-foreground">
            Track and manage work permit deposit payments • {filteredAndSortedPayments.length} record{filteredAndSortedPayments.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Collection
          </Button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deposits</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MVR {summaryStats.totalDepositAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Expected collection
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collected</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">MVR {summaryStats.totalCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {summaryStats.collectionRate.toFixed(1)}% collection rate
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">MVR {summaryStats.totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {summaryStats.pendingCount + summaryStats.partialCount} candidates
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{summaryStats.overdueCount}</div>
            <p className="text-xs text-muted-foreground">
              Requires follow-up
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{summaryStats.completedCount}</div>
            <p className="text-xs text-muted-foreground">
              Full payments received
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Collection Rate Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Collection Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-medium">{summaryStats.collectionRate.toFixed(1)}%</span>
            </div>
            <Progress value={summaryStats.collectionRate} className="h-3" />
            
            <div className="grid gap-3 md:grid-cols-4 mt-6">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-700">{summaryStats.completedCount}</div>
                <div className="text-sm text-green-600">Completed</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-700">{summaryStats.partialCount}</div>
                <div className="text-sm text-yellow-600">Partial</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{summaryStats.pendingCount}</div>
                <div className="text-sm text-blue-600">Pending</div>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-700">{summaryStats.overdueCount}</div>
                <div className="text-sm text-red-600">Overdue</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates, transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={nationalityFilter} onValueChange={setNationalityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Nationality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Nationalities</SelectItem>
                {uniqueNationalities.map((nationality) => (
                  <SelectItem key={nationality} value={nationality}>{nationality}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Table */}
      {filteredAndSortedPayments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="text-center space-y-6">
              <div className="mx-auto h-24 w-24 rounded-full bg-muted/30 flex items-center justify-center">
                <DollarSign className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">No payment records found</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  {searchQuery || nationalityFilter !== 'all' || statusFilter !== 'all'
                    ? 'Try adjusting your search filters to find payment records.'
                    : 'No work permit deposits have been recorded yet. Start by adding your first collection record.'}
                </p>
              </div>
              {!searchQuery && nationalityFilter === 'all' && statusFilter === 'all' && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Collection
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('candidateName')} className="h-auto p-0 font-medium">
                    Candidate {getSortIcon('candidateName')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('nationality')} className="h-auto p-0 font-medium">
                    Nationality {getSortIcon('nationality')}
                  </Button>
                </TableHead>
                <TableHead>Position</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('depositAmount')} className="h-auto p-0 font-medium">
                    Deposit Amount {getSortIcon('depositAmount')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('paidAmount')} className="h-auto p-0 font-medium">
                    Paid Amount {getSortIcon('paidAmount')}
                  </Button>
                </TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('dueDate')} className="h-auto p-0 font-medium">
                    Due Date {getSortIcon('dueDate')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => handleSort('paymentStatus')} className="h-auto p-0 font-medium">
                    Status {getSortIcon('paymentStatus')}
                  </Button>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedPayments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={payment.avatar} alt={payment.candidateName} />
                        <AvatarFallback>{payment.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{payment.candidateName}</div>
                        <div className="text-sm text-muted-foreground">{payment.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Flag className="h-4 w-4 text-muted-foreground" />
                      {payment.nationality}
                    </div>
                  </TableCell>
                  <TableCell>{payment.position}</TableCell>
                  <TableCell>
                    <div className="font-medium">MVR {payment.depositAmount.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getPaymentMethodIcon(payment.paymentMethod)}
                      <span className="font-medium text-green-600">
                        MVR {payment.paidAmount.toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={payment.remainingAmount > 0 ? 'text-red-600 font-medium' : 'text-gray-500'}>
                      MVR {payment.remainingAmount.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {new Date(payment.dueDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payment.paymentStatus)}>
                      {payment.paymentStatus === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                      {payment.paymentStatus === 'partial' && <Clock className="h-3 w-3 mr-1" />}
                      {payment.paymentStatus === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                      {payment.paymentStatus === 'overdue' && <AlertCircle className="h-3 w-3 mr-1" />}
                      {payment.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedPayment(payment)
                          setShowDetailsDialog(true)
                        }}
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      {payment.paymentStatus !== 'completed' && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedPayment(payment)
                            setShowPaymentDialog(true)
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Payment
                        </Button>
                      )}
                      {(payment.paymentStatus === 'pending' || payment.paymentStatus === 'overdue') && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSendReminder(payment)}
                          disabled={isLoading}
                        >
                          <Send className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Add Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Add payment for {selectedPayment?.candidateName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-6">
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Deposit:</span>
                    <span className="font-medium">MVR {selectedPayment.depositAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Paid Amount:</span>
                    <span className="font-medium text-green-600">MVR {selectedPayment.paidAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining:</span>
                    <span className="font-medium text-red-600">MVR {selectedPayment.remainingAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Payment Amount (MVR) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    max={selectedPayment.remainingAmount}
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder={`Max: ${selectedPayment.remainingAmount.toLocaleString()}`}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="method">Payment Method *</Label>
                  <Select value={paymentForm.method} onValueChange={(value) => setPaymentForm(prev => ({ ...prev, method: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="transactionRef">Transaction Reference</Label>
                  <Input
                    id="transactionRef"
                    value={paymentForm.transactionRef}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, transactionRef: e.target.value }))}
                    placeholder="Enter reference number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={paymentForm.notes}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes about this payment"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPayment} disabled={isLoading || !paymentForm.amount}>
                  {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Record Payment
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Details - {selectedPayment?.candidateName}</DialogTitle>
            <DialogDescription>
              Complete payment information and history
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedPayment.avatar} alt={selectedPayment.candidateName} />
                  <AvatarFallback>{selectedPayment.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedPayment.candidateName}</h3>
                  <p className="text-muted-foreground">{selectedPayment.position}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getStatusColor(selectedPayment.paymentStatus)}>
                      {selectedPayment.paymentStatus}
                    </Badge>
                    <Badge variant="outline">
                      {selectedPayment.nationality}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedPayment.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedPayment.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedPayment.nationality}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedPayment.position}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Deposit:</span>
                      <span className="font-medium">MVR {selectedPayment.depositAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Paid Amount:</span>
                      <span className="font-medium text-green-600">MVR {selectedPayment.paidAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Remaining:</span>
                      <span className={`font-medium ${selectedPayment.remainingAmount > 0 ? 'text-red-600' : 'text-gray-500'}`}>
                        MVR {selectedPayment.remainingAmount.toLocaleString()}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Due Date:</span>
                      <span>{new Date(selectedPayment.dueDate).toLocaleDateString()}</span>
                    </div>
                    {selectedPayment.paidDate && (
                      <div className="flex justify-between">
                        <span>Last Payment:</span>
                        <span>{new Date(selectedPayment.paidDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {selectedPayment.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{selectedPayment.notes}</p>
                  </CardContent>
                </Card>
              )}

              {selectedPayment.paymentHistory.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Payment History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedPayment.paymentHistory.map((record) => (
                        <div key={record.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                          <div className="flex items-center gap-3">
                            {getPaymentMethodIcon(record.method)}
                            <div>
                              <div className="font-medium">MVR {record.amount.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(record.date).toLocaleDateString()} • {record.collectedBy}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium capitalize">{record.method.replace('-', ' ')}</div>
                            {record.transactionRef && (
                              <div className="text-xs text-muted-foreground">{record.transactionRef}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}