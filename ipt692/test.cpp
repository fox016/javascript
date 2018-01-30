#include <fstream>
#include <iostream>
#include <string>

using namespace std;

int main()
{
	try {
		locale::global(locale("")); // https://stackoverflow.com/a/3950795/1060631
		wofstream out; // https://stackoverflow.com/a/18226387/1060631
		out.open("test.txt", wofstream::out);
		wstring test = L"北선발대 방남 이틀째…평창 개폐회식장·경기장 집중 점검";
		out << test << endl;
		out << test.size() << endl;
		for(wstring::iterator it=test.begin(); it!=test.end(); it++)
			out << *it << endl;
		out.close();
	} catch (...) {
		cout << "Exception caught" << endl;
	}

	return 0;
}
