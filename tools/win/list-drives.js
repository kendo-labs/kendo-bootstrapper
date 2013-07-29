WScript.Echo("---CUT-HERE---");

var WMI = GetObject("winmgmts:{impersonationLevel=impersonate}!//./root/cimv2");

var disks = WMI.ExecQuery("SELECT * FROM Win32_LogicalDisk");
var enumItems = new Enumerator(disks);

for (; !enumItems.atEnd(); enumItems.moveNext()) {
    var thing = enumItems.item();
    WScript.Echo(thing.Name + " | " + thing.Description + " | " + thing.VolumeName);
}
