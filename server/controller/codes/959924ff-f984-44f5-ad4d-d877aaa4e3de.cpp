#include <iostream>
using namespace std;
int main() 
{ 
  long long t;
  cin>>t;
  while(t--)
  { 
    long long n,m;
    cin>>n>>m;
    long long product = n*m;
    if(n == 1 && m == 1) cout<<"0/1"<<endl;
    else if(product%2 == 0) cout<<"1/2"<<endl;
    else{ 
      long long k = product/2; 
      cout<<k<<"/"<<product<<endl;
    } 
  }
  return 0;
}