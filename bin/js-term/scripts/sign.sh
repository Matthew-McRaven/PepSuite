cd ../dist
mv js-term-macos .pepterm
chmod +x pepterm
codesign --deep --force --options=runtime --sign "6FC8F55BEFE887379900E3FC48E23469A453437B" --timestamp ./pepterm
rm -rf /tmp/pepterm
ditto pepterm /tmp/pepterm/Applications/
productbuild --identifier "edu.pepperdine.pepterm" --sign 74287DA202C5D4D84D62D951E00B0C183A84B1AE --timestamp --root /tmp/pepterm pepterm.pkg
xcrun altool --notarize-app --primary-bundle-id "edu.pepperdine.pepterm" --username "matthew.mcraven@alumnimail.pepperdine.edu" --password @keychain:altool --file pepterm.pkg
until xcrun stapler staple pepterm.pkg
do
    sleep 60
done
